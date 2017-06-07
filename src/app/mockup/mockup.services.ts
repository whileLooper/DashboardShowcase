import { Http, Headers, RequestOptions, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

const baseHeader = { 'Content-Type': 'application/x-www-form-urlencoded' };

@Injectable()
export class MockupServices {

    constructor(private http: Http) {
        // TODO: Use official Angular2 CORS support when merged 
        // (https://github.com/angular/angular/issues/4231).
        let _build = (<any> http)._backend._browserXHR.build;
        (<any> http)._backend._browserXHR.build = () => {
          let _xhr =  _build();
          _xhr.withCredentials = true;
          return _xhr;
        };
    }

  // 当前汇总信息
  public getOverallInfo(){
    let url = 'http://pmsapi.yaduo.com:8002/api/GetChainRevenue?&chainid=310006&userid=4325&shift=a&timespan=1496799229695&token=01821d21848ff488323cb6ec4f5056b3a92a1267&sign=c5cbf9103e5c7f6c2c17d0160bd33e341f261422&rand=420&_=1496799229627';
    let headers = new Headers(baseHeader);
        let options = new RequestOptions({ headers: headers });

        return Observable
            .timer(1, 5000)
            .flatMap(() => {
                return this.http.post(url, options)
                    .map((response: any) => {
                        return response.json();
                    });
            });
    }
}

