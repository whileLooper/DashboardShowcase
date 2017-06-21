import { Component } from '@angular/core';
import { MockupServices } from "./mockup.services";
import { Observable } from 'rxjs/Observable';
import { defaultColors } from '../components/chart.colors';  // chartjs color

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'mockup-cmp',
  templateUrl: './mockup.component.html'
})

export class MockupComponent {
  isLoading: boolean;
  colors: any = defaultColors;
  overAllData: any;
  mainStatus: any;

  totalInfo: any;

  config: any;  // donut chart config

  constructor(private _service: MockupServices) {
    this.isLoading = true;
    this.totalInfo = {};
    this.config = {
      donut: undefined, // 实时信息汇总
      bar: undefined,   // 实时客房入住率
    }；
  }

  ngOnInit(): void {
    this.getOverallInfo();
  }

  /**
   * 
   */
  public getOverallInfo() {
    // let result = this._service.getOverallInfo();
    // console.log(result);
    let sub1 = this._service.getOverallInfo();
    let sub2 = this._service.getRoomsDetail();

    Observable.forkJoin(sub1, sub2).subscribe(
      (res: any) => {
        this.updateData(res);
      },
      (err: any) => {
        console.error('访问链接信息报错');
      }
    );
  }

  /**
   * update and mapping api data
   * @param res [object]
   */
  public updateData(res: any) {
    this.overAllData = res[0].hasOwnProperty('Data') ? res[0].Data : undefined;
    this.mainStatus = res[1].hasOwnProperty('Data') ? res[1].Data : undefined;

    // set overall object value
    this.totalInfo['Ad_DepFolio'] = this.overAllData['Ad_DepFolio'];  // 今日预离
    this.totalInfo['Ad_FolioCount'] = this.overAllData['Ad_FolioCount'];  // 今日预抵
    this.totalInfo['Ad_AllDebit'] = this.overAllData['Ad_AllDebit'];  // 预测营收
    this.totalInfo['currOccupied'] = this.mainStatus.filter(e => e['CheckInState'] === 1).length;
    this.totalInfo['currEmpty'] = this.mainStatus.filter(e => e['CheckInState'] === 2).length;

    this.initDonutChart(this.totalInfo);  // 实时信息汇总图标
    this.initBarChart(this.mainStatus);   // 实时客房入住率图标
    this.isLoading = false;
  }

  /**
   * initial donut chart configures and data
   */
  public initDonutChart(data: any) {
    this.config.donut = {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            data['currOccupied'],
            data['currEmpty'],
            data['Ad_DepFolio'],
            data['Ad_FolioCount']
          ],
          label: 'Dataset 1',
          backgroundColor: this.colors
        }],
        labels: [
          '今日在住',
          '剩余房间',
          '今日预离',
          '今日预抵'
        ],
      },
      options: {
          responsive: true,
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: '预测营收: ￥' + data['Ad_AllDebit']
          },
          animation: {
              animateScale: true,
              animateRotate: true
          }
      }
    };
  }

  public initBarChart(data: any) {
    let floorData: any = {};

    // init y axis labels
    for (let i = 3; i < 14; i++ ) {
      floorData[i] = { total: 0, occupy: 0, perf: 0 };
    }


    // count each floor number and occupation
    data.map((val, i) => {
      ++floorData[val['Floor']].total;
      if (val['CheckInState'] === 1) ++floorData[val['Floor']].occupy;
    });
    for (let key in floorData) {
      if (key) {
        floorData[key].perf = Math.floor(floorData[key]['occupy'] / floorData[key]['total'] * 100);
      }
    }

    // change perf to array
    let perfArr = [];
    for (let key in floorData) {
      if (key) {
        perfArr.push(floorData[key].perf);
      }
    }

    // chart configuration
    this.config.bar = {
      type: 'horizontalBar',
      data: {
        labels: Object.keys(floorData).map(val => val + ' 楼'),
        datasets: [{
          label: '入住率(百分比) %',
          backgroundColor: this.colors,
          data: perfArr
        }
      ]},
      options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          rectangle: {
            borderWidth: 2,
          }
        },
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '当前各个楼层入住率'
        }
      }
    };
  }

}

