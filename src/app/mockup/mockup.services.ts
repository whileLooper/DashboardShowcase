import { Http, Headers, RequestOptions, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
const baseHeader = { 'Content-Type': 'text/plain' };
declare var $: any;
@Injectable()
export class MockupServices {
    result;
    constructor(private http: Http) {
        // TODO: Use official Angular2 CORS support when merged 
        // (https://github.com/angular/angular/issues/4231).
        let _build = (<any> http)._backend._browserXHR.build;
        (<any> http)._backend._browserXHR.build = () => {
          let _xhr =  _build();
          _xhr.withCredentials = false;
          return _xhr;
        };
    }

  /**
   * 当前汇总信息：
   *    + 当前营业额
   *    + 
   */
  public getOverallInfo() {
      let url = 'http://pmsapi.yaduo.com:8002/api/GetChainRevenue?&chainid=310006&userid=4325&shift=a&timespan=1496799229695&token=01821d21848ff488323cb6ec4f5056b3a92a1267&sign=c5cbf9103e5c7f6c2c17d0160bd33e341f261422&rand=420&_=1496799229627';

      return this.http.get(url)
                        .map(res => res.json())
                        .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  /**
   * 实时房间详情
   */
  public getRoomsDetail() {
    let url = 'http://pmsapi.yaduo.com:8000/api/GetMainStatus?&chainid=310006&userid=4325&shift=a&timespan=1497468250973&token=49724815cc20436f8015e61778cf7e791448353b&sign=8cab2fb387c75b1b28baad18559abe4053ff47bf&rand=726&_=1497468250908';

    return this.http.get(url)
                    .map(res => res.json())
                    .catch((error: any) => Observable.throw(error || 'Server error'));
  }

}

