import { Component } from '@angular/core';
import { MockupServices } from "./mockup.services";
import { Observable } from 'rxjs/Observable';
import { defaultColors } from '../components/chart.colors';  // chartjs color

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

declare var moment: any;

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
  monthArr: any;  // array contains current year month
  config: any;  // donut chart config
  sub3: any;    // subscription 3

  constructor(private _service: MockupServices) {
    this.isLoading = true;
    this.totalInfo = {};
    this.config = {
      donut: undefined, // 实时信息汇总
      bar: undefined,   // 实时客房入住率
      line: undefined
    };
  }

  ngOnInit(): void {
    this.getOverallInfo();
    this.getMonthArr();
  }

  /**
   * 
   */
  public getOverallInfo() {

    // get current month first day, and current day
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);

    firstDay = moment(firstDay).format('YYYY-MM-DD');
    lastDay = moment(lastDay).format('YYYY-MM-DD');

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

    this.sub3 = this._service.getMonthlyGross(firstDay, lastDay).subscribe(
      (res: any) => {
        let monthlyGrossData = res.hasOwnProperty('Data') ? res.Data.DataSet : undefined;
        this.initMonthGrossChart(monthlyGrossData); // 当月营业收入统计
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
    this.isLoading = false;
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
    this.isLoading = false;
  }

  public initMonthGrossChart(data: any) {
    let labels = [], chartData = [];
    let labelArr = ['净房费', '现金', '银行卡', '储值结算', '礼金券', '其他', '小计'];

    data.reverse(); //backward data

    // init chart data includes: 净房费,现金,银行卡,储值结算,礼金券,其他,小计
    for (let i = 0; i < 7; i++) {
      chartData.push({
        label: labelArr[i],
        backgroundColor: this.colors[i],
        borderColor: this.colors[i],
        fill: false,
        data: []
      });
    }

    // get x axis labels
    data.map((val, i) => {
      labels.push(moment(val['CreateAccDate']).format('MM-DD'));
      chartData[0].data.push(val['RoomAccIncomeDebit']);  //净房费
      chartData[1].data.push(val['MoneyCredit']);  //现金
      chartData[2].data.push(val['BankCardCredit']);  //银行卡
      chartData[3].data.push(val['MebStoreCredit']);  //储值结算
      chartData[4].data.push(val['StoreCredit']);  //礼金券
      chartData[5].data.push(val['AllCredit']
                          - val['StoreCredit']
                          - val['MebStoreCredit']
                          - val['MoneyCredit']
                          - val['BankCardCredit']);  //其他
      chartData[6].data.push(val['AllCredit']);  //小计
    });

    // config line chart
    this.config.line = {
      type: 'line',
      data: {
        labels: labels,
        datasets: chartData
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: '当月营业收入统计表'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: '当月日期'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: '营业收入（￥）'
            },
            ticks: {
              min: 0
            }
          }]
        }
      }
    };
    this.isLoading = false;
  }

  /**
   * return a array contains current year month
   */
  public getMonthArr() {

    let totalMonth = [ '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月' ];

    let index = new Date().getMonth();

    return totalMonth.splice(0, index + 1);
  }

  public submitMonth(index: number)  {
    this.isLoading = true;
    let date = new Date();

    let y = date.getFullYear();
    let m = index === date.getMonth() ? date.getMonth() : index;
    let firstDay = moment(new Date(y, m, 1)).format('YYYY-MM-DD');
    let lastDay = moment(new Date(y, m + 1, 0)).format('YYYY-MM-DD');

    // make a new subscription
    if (this.sub3) {
      this.sub3.unsubscribe();
      this.sub3 = this._service.getMonthlyGross(firstDay, lastDay).subscribe(
        (res: any) => {
          let monthlyGrossData = res.hasOwnProperty('Data') ? res.Data.DataSet : undefined;
          this.initMonthGrossChart(monthlyGrossData); // 当月营业收入统计
        }
      );
    }
  }
}

