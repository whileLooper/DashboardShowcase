import { Component } from '@angular/core';
import { MockupServices } from "./mockup.services";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'mockup-cmp',
  templateUrl: './mockup.component.html'
})

export class MockupComponent {
  isLoading: boolean;
  overAllData: any;
  mainStatus: any;

  totalInfo: any;

  constructor(private _service: MockupServices) {
    this.isLoading = true;
    this.totalInfo = {};
  }

  ngOnInit(): void {
    this.getOverallInfo();
    // this.getRoomsDetail();
  }

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

  public updateData(res: any) {
    this.overAllData = res[0].hasOwnProperty('Data') ? res[0].Data : undefined;
    this.mainStatus = res[1].hasOwnProperty('Data') ? res[1].Data : undefined;

    // set overall object value
    this.totalInfo['Ad_DepFolio'] = this.overAllData['Ad_DepFolio'];  // 今日预离
    this.totalInfo['Ad_FolioCount'] = this.overAllData['Ad_FolioCount'];  // 今日预抵
    this.totalInfo['Ad_AllDebit'] = this.overAllData['Ad_AllDebit'];  // 预测营收
    this.totalInfo['currOccupied'] = this.mainStatus.filter(e => e['CheckInState'] === 1).length;
    this.totalInfo['currEmpty'] = this.mainStatus.filter(e => e['CheckInState'] === 2).length;
    this.isLoading = false;
    console.log(this.mainStatus);
  }

}

