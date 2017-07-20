import { NgModule } from '@angular/core';
import { HighchartsDirective } from './highcharts.directive';

@NgModule({
  declarations: [
    HighchartsDirective
  ],
  exports: [
    HighchartsDirective
  ]
})

export class HighchartsModule {

}
