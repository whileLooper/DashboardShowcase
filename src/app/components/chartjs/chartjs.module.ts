import { NgModule } from '@angular/core';

import 'chart.js';
import 'chartjs-color';
import 'chartjs-color-string';

import { ChartjsDirective } from './chartjs.directive';

@NgModule({
  declarations: [
    ChartjsDirective
  ],
  exports: [
    ChartjsDirective
  ]
})

export class ChartjsModule {

}
