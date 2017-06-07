import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MockupComponent } from './index';
import { ChartjsModule } from '../components/chartjs/index';
import { MockupServices } from './mockup.services';

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
    RouterModule.forChild(routes)
  ],
  providers: [
    MockupServices
  ]
})
export class MockupModule {
  static routes = routes;
}
