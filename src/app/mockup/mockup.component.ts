import { Component } from '@angular/core';
import { MockupServices } from "./mockup.services";

@Component({
  selector: 'mockup-cmp',
  templateUrl: './mockup.component.html'
})

export class MockupComponent {
  isLoading: boolean;
  overAllData: any;
  constructor(private _service: MockupServices) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getOverallInfo();
    console.log(this.overAllData);
  }

  public getOverallInfo() {
    this._service.getOverallInfo().subscribe(
      (res: any) => {
        if (res.hasOwnProperty('ErrCode') === 200) {
          this.overAllData = res;
        }
      },
      (err: any) => {
        console.error('房态图，访问链接信息报错');
      }
    );
  }
}

