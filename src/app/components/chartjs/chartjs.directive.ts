import { Directive, ElementRef, Renderer, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
//import { defaultColors } from './chartjsDefault.colors';

import { defaultColors } from '../chart.colors';

declare var jQuery: any;
declare var Chart: any;
declare var moment: any;


@Directive({
  selector: '[chartjs-chart]'
})

export class ChartjsDirective {
  @Input() public data: any;
  @Input() public options: any = {responsive: true};
  @Input() public title: string;
  @Input() max: string;
  public labels:Array<any> = [];
  private ctx:any;
  private chart:any;
  private custom_colors:Array<string>;
  public $el: any;

  public defaultColors: any;

  constructor(el: ElementRef, renderer: Renderer) {
    this.$el = jQuery(el.nativeElement);
    this.defaultColors = defaultColors;
  }

  ngOnInit(): void {
    this.ctx = this.$el[0].getContext('2d');
    // get chart timeSeries and data transform into correct format
    // if (this.data) {
    //   let timeSeries = this.getTimeseries(this.data);
    //   let chartDatasets = this.transformDatasets(this.data);
    //   this.chart = this.getChartBuilder(this.ctx, timeSeries, chartDatasets);
    // }
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
  private getChartBuilder(ctx: any): void {
    if(this.options.colors) {
      this.custom_colors = this.options.colors;
    }


    let _options:any = {
      type: this.options.chartType,
      data: this.transformDatasets(this.data),
      options: {
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
          yAxes:[ {ticks:{
            callback: function(value) {
              return value +"%";
            }
          } } ]
        }
        
      }
    };
    if(this.options.yMax) {
      _options.options.scales.yAxes[0].ticks.min= 70;
      _options.options.scales.yAxes[0].ticks.max= 100;
    }

    



/*
    //if(this.options.yMax || (this.max && Number(this.max) > 0) ) {

    if(this.options.yMax) {
      //_options.options.scales.yAxes[0].ticks.max= 100;
    }
*/
    let chart = new Chart(ctx, _options);
    return chart;
  }


  private getTimeseries(data: any): any {
    let result: Array<any> = [];
    if (data) {
      for (let i in data[0]['data']) {
        if (data[0]['data'][i]) {
          let temp = new Date(+data[0]['data'][i][0]);
          result.push(temp);
        }
      }
    }
    return result;
  }
  private transformDatasets(data: any) {
    let result = {
      datasets: data.datasets,
      labels: data.labels
    };
    // assgin different color to dataset
    for (let i in data['datasets']) {
      if (data['datasets'][i]) {

        let colorIndex = parseInt(i, 10) % (this.defaultColors.length);
        if(this.custom_colors !== undefined) {
          colorIndex = parseInt(i, 10) % (this.custom_colors.length);
          result['datasets'][i]['backgroundColor'] = this.custom_colors[colorIndex];
        }
        else {
          result['datasets'][i]['backgroundColor'] = defaultColors[colorIndex];
        }

        //result['datasets'][i]['backgroundColor'] = defaultColors[colorIndex]['fillColor'];
        
      }
    }
    return result;
  }
}

