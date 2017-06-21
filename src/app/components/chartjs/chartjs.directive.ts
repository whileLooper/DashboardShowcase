import { Directive, ElementRef, Renderer, Input } from '@angular/core';

import { arrDefaultColors } from '../chart.colors';

declare var jQuery: any;
declare var Chart: any;
declare var moment: any;


@Directive({
  selector: '[chartjs-chart]'
})

export class ChartjsDirective {
  @Input() public data: any;
  @Input() public config: any;
  @Input() public options: any = {responsive: true};
  @Input() public title: string;
  @Input() max: string;
  public labels:Array<any> = [];
  public $el: any;
  public defaultColors: any;

  private ctx: any;
  private chart: any;
  private custom_colors: Array<string>;


  constructor(el: ElementRef, renderer: Renderer) {
    this.$el = jQuery(el.nativeElement);
    this.defaultColors = arrDefaultColors;
  }

  ngOnInit(): void {
    this.ctx = this.$el[0].getContext('2d');
    this.ctx.height = 500;
    this.chart = this.getChartBuilder(this.ctx);
  }
  // destroy chart component
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = void 0;
    }
  }
  // major chart build function
  private getChartBuilder(ctx: any) {


    let config = this.config ? this.config : {
      type: this.options.chartType,
      data: this.data,
      options: this.options ? this.options : {
        title: {
          display: true,
          position: 'top',
          fullWidth: true,
          text: (this.title || '')
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 5
          }
        },
        scales: {
          xAxes: [
            {
              stacked: this.options.stack ? this.options.stack : false,
              ticks: {
                min: 0,
                maxRotation: 0, // ratio of tick label
                // maxTicksLimit: 6,
                fontSize: 12,
                padding: 0,
                beginAtZero: true,
              }
            }
          ],
          yAxes: [ {ticks: {
            callback: function(value) {
              return value + '%';
            }
          } } ]
        }
      }
    };
    if (this.options.yMax) {
      this.config.options.scales.yAxes[0].ticks.min = 70;
      this.config.options.scales.yAxes[0].ticks.max = 100;
    }

    let chart = new Chart(ctx, this.config);
    return chart;
  }
}

