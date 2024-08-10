import {Component, ElementRef, ViewChild} from '@angular/core';
import * as echarts from 'echarts';


@Component({
  selector: 'app-graph-circle',
  standalone: true,
  imports: [],
  templateUrl: './graph-circle.component.html',
  styleUrl: './graph-circle.component.css'
})
export class GraphCircleComponent {
  chart!: echarts.ECharts
  @ViewChild("circle") circleEl!: ElementRef;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.chart = echarts.init(this.circleEl.nativeElement);
    console.log("native element")
    console.log(this.circleEl.nativeElement)

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        data: [
          '¿Por qué?',
          '¿Cómo?',
          '¿Qué?'
        ]
      },
      series: [
        {
          name: '¿Por qué?',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],
          label: {
            position: 'inside',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 90, name: '¿Por qué?'},
            {value: 10, name: ''}
          ]
        },
        {
          name: '¿Cómo?',
          type: 'pie',
          radius: ['30%', '50%'],
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#4eaad2',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 22,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          data: [
            {value: 30, name: '¿Cómo?'},
            {value: 70, name: ''}
          ]
        },
        {
          name: '¿Qué?',
          type: 'pie',
          radius: ['50%', '70%'],
          label: {
            position: 'inside',
            fontSize: 14
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 90, name: '¿Qué?'},
            {value: 10, name: ''}
          ]
        }
      ]
    };


    // updateChart(seriesIndex, percentage) {
    //   let updatedOption = chart.getOption);
    //   updatedOption.series[seriesIndex].data[0].value = percentage;
    //   updatedOption.series[seriesIndex].data[1].value = 100 - percentage;(
    this.chart.setOption(option);
  }
}

// changeCircle1() {
//   const answer = {
//     40: '4',
//     41: '4',
//     42: '4',
//     43: '3'
//   };
//
//   let acum = 0;
//   let count = 0;
//
//   for (const prop in answer) {
//     if (prop >= 40 && prop <= 43) {
//       acum += parseFloat(answer[prop]);
//       count += 1;
//     }
//   }
//
//   const percentage = (count > 0) ? (acum / (count * 4) * 100) : 0;
//   console.log("Porcentaje ¿Por qué?:", percentage);
//   this.updateChart(0, percentage);
// }

// changeCircle2() {
//   const answer = {
//     44: '4',
//     45: '4',
//     46: '4',
//     47: '3'
//   };
//
//   let acum = 0;
//   let count = 0;
//
//   for (const prop in answer) {
//     if (prop >= 44 && prop <= 47) {
//       acum += parseFloat(answer[prop]);
//       count += 1;
//     }
//   }
//
//   const percentage = (count > 0) ? (acum / (count * 4) * 100) : 0;
//   console.log("Porcentaje ¿Cómo?:", percentage);
//   this.updateChart(1, percentage);
// }

//   changeCircle3() {
//     const answer = {
//       48: '3',
//       49: '2',
//       50: '4',
//       51: '1',
//       52: '5'
//     };
//
//     let acum = 0;
//     let count = 0;
//
//     for (const prop in answer) {
//       if (prop >= 48 && prop <= 52) {
//         acum += parseFloat(answer[prop]);
//         count += 1;
//       }
//     }
//
//     const percentage = (count > 0) ? (acum / (count * 5) * 100) : 0;
//     console.log("Porcentaje ¿Qué?:", percentage);
//     this.updateChart(2, percentage);
//   }
// }

//circulo


// document.addEventListener('DOMContentLoaded', function () {
//   const chart = echarts.init(document.getElementById("circleChart"));
//
//
//   chart.setOption(option)
