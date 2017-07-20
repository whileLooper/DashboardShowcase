import { Directive, ElementRef, Renderer, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { defaultColors } from '../chart.colors';

import * as Highcharts from 'highcharts';

@Directive({
  selector: '[high-chart]'
})

export class HighchartsDirective {
  @Input() public options: any;
  @Input() public dateRange: any;
  @Input() public chartData: any;
  @Input() public toggleOn: any;
  @Output() public outputChart = new EventEmitter();
  public $el: any;
  public isLoading: true;
  public chartObj: any;

  constructor(public el: ElementRef, public renderer: Renderer) {
    this.$el = el.nativeElement;  // get chart html container
  }

  ngAfterViewInit() {
    this.chartObj = this.render();
  }

  // detecting directive changes
  ngOnChanges(changes: SimpleChanges) {

    // toggle data series
    if (
      this.chartObj
      && changes['toggleOn']
      && changes['toggleOn'].currentValue !== changes['toggleOn'].previousValue
    ) {
      this.chartObj.series.forEach((val, i) => {
        val.setVisible(changes['toggleOn'].currentValue, true);
      });
    }
  }

  /**
   * rendering the highcharts base on regular configuration from Highcharts
   * see: http://api.highcharts.com/highcharts/
   */
  public render(): any {
    if (!this.options) return;
    /**
     * overall Highcharts class options setting
     */
    Highcharts.setOptions({
      global: {
        // timezone: 'America/New_York',
        timezoneOffset: 4 * 60
      },
      lang: {
        thousandsSep: ','
      }
    });

    let config = {
      /**
       * Options regarding the chart area and plot area as well as general chart options.
       * see: http://api.highcharts.com/highcharts/chart
       */
      chart:
        {
          type: 'line',
          zoomType: 'x',
          height: 500, // support number or string (for example '56%')
          animation: true,
          backgroundColor: 'transparent'
        },

      /**
       * An array containing the default colors for the chart's series. 
       * When all colors are used, new colors are pulled from the start again. 
       */
      // colors: 

      /**
       * Highchart by default puts a credits label in the lower right corner of the chart. 
       * This can be changed using these options.
       * see: http://api.highcharts.com/highcharts/credits
       */
      credits: {
        enabled: true,
        href: undefined,
        text: '',
        position: {
          align: 'right',
          x: 0,
          y: 20,
          verticalAlign: 'top'
        }
      },

      /**
       * The Data module provides a simplified interface for adding data to 
       * a chart from sources like CVS, HTML tables or grid views. 
       * See also the tutorial article on the Data module.
       * It requires the modules/data.js file to be loaded.
       * see: http://api.highcharts.com/highcharts/data.parseDate
       */
      data:
        this.options.hasOwnProperty('data')
        ? this.options.data
        : undefined
        ,

      /**
       * The legend is a box containing a symbol and name for each series item or point item 
       * in the chart. Each series (or points in case of pie charts) 
       * is represented by a symbol and its name in the legend.
       * see: http://api.highcharts.com/highcharts/legend
       */
      legend:
        this.options.hasOwnProperty('legend')
        ? this.options.legend
        : {
          enabled: true,
          itemDistance: 10,
          itemStyle: {
            'color': '#333333',
            'cursor': 'pointer',
            'fontSize': '10px',
            'fontWeight': 'bold',
            'textOverflow': 'ellipsis'
          },
          maxHeight: 50
        },

      /**
       * The chart's main title.
       * see: http://api.highcharts.com/highcharts/title
       */
      title: {
        align: 'center',
        floating: false,
        text:
          this.options.hasOwnProperty('title')
          ? this.options.title.text
          : undefined,
        style: {
          'color': '#333333',
          'fontSize': '15px'
        },
        margin: 5
      },

      /**
       * The chart's subtitle
       * see: http://api.highcharts.com/highcharts/subtitle
       */
      subtitle:
        this.options.hasOwnProperty('subtitle')
        ? this.options.subtitle
        : {
          align: 'center',
          floating: false,
          text: undefined
        },

      /**
       * The X axis or category axis. Normally this is the horizontal axis, 
       * though if the chart is inverted this is the vertical axis. 
       * In case of multiple axes, the xAxis node is an array of configuration objects.
       * see: http://api.highcharts.com/highcharts/xAxis
       */
      xAxis:
        this.options.hasOwnProperty('xAxis')
        ? this.options.xAxis
        : {
          type: 'datetime'
        },

      /**
       * The Y axis or value axis. Normally this is the vertical axis, 
       * though if the chart is inverted this is the horizontal axis. 
       * In case of multiple axes, the yAxis node is an array of configuration objects.
       * see: http://api.highcharts.com/highcharts/yAxis
       */
      yAxis:
        this.options.hasOwnProperty('yAxis')
        ? this.options.yAxis
        : {
          title: undefined,
          reversedStacks: false
        },

      /**
       * Options for the tooltip that appears when the user hovers over a series or point.
       * see: http://api.highcharts.com/highcharts/tooltip
       */
      tooltip:
        this.options.hasOwnProperty('tooltip')
        ? this.options.tooltip
        : {
          useHTML: true,
          shared: true,
          crosshairs: true,
          pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>'
        },

      /**
       * The plotOptions is a wrapper object for config objects for each series type. 
       * The config objects for each series can also be overridden 
       * for each series item as given in the series array.
       * see: http://api.highcharts.com/highcharts/plotOptions
       */
      plotOptions:
        this.options.hasOwnProperty('plotOptions')
        ? this.options.plotOptions
        : {
          area: {
            stacking: 'normal'
          },
          column: {
            stacking: 'normal'
          },
          line: {
            dataLabels: {
              enabled: false
            },
            marker: {
              enabled: false
            },
            enableMouseTracking: true,
            states: {
              hover: {
                enabled: true,
                lineWidth: 4
              }
            }
          },
          series: {
            dataLabels: {
              enabled: false
            },
            marker: {
              enabled: false
            },
            fillOpacity: 0.35
          }
        },

      /**
       * General options for all series types.
       * see: http://api.highcharts.com/highcharts/plotOptions.series
       */
      series:
        this.options.hasOwnProperty('series')
        ? this.options.series
        : [
          {
            type: 'line',
            name: '',
            data: this.chartData
          }
        ]
    };

    let chart = Highcharts.chart(this.$el, config); // render highchart
    this.outputChart.emit(chart);                // emit chart object as output

    return chart;                                // highchart instance
  }
}
