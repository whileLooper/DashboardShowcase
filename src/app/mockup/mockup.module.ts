import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MockupComponent } from './index';
import { ChartjsModule } from '../components/chartjs/index';
import { HighchartsModule } from '../components/highcharts/index';
import { MockupServices } from './mockup.services';
import { HttpModule, JsonpModule } from '@angular/http';

// style module
import { ButtonsModule, DropdownModule } from 'ng2-bootstrap';

export const routes = [
  {path: '', component: MockupComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    MockupComponent
  ],
  imports: [
    CommonModule,
    ChartjsModule,
    HighchartsModule,
    RouterModule.forChild(routes),
    JsonpModule,
    ButtonsModule.forRoot(),
    DropdownModule.forRoot()
  ],
  providers: [
    MockupServices
  ]
})
export class MockupModule {
  static routes = routes;
}
