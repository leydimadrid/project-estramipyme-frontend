import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { GlobalProviderService } from '@services/global-provider.service';
import { ReportReoDTO } from '../../DTO/reportReoDTO';

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphs.component.html',
  // styleUrl: './graphs.component.css',
})
export class GraphsComponent implements OnInit {
  @ViewChild('graph') radarEl!: ElementRef;
  radarChart!: Chart;

  constructor(
    private el: ElementRef,
    private globalProvider: GlobalProviderService
  ) {}


  ngOnInit() {
    console.log('Inicialización completa');
    this.globalProvider.RadarData$.subscribe((value) => {
      if (this.radarEl) {
        if (this.radarChart) {
          this.radarChart.destroy();
        }
        console.log(value);
        //const valores: number[] = [1, 2, 3, 4, 5, 6];
        this.renderChart(value);
      }
    });
  }

  renderChart(values: ReportReoDTO[]) {
    const radarData = {
      labels: values.map(label => label.name),
      datasets: [
        {
          label: 'Resultado REO',
          data: values.map(reo => reo.score),
          fill: true,
          backgroundColor: 'rgba(21, 95, 231, 0.2)',
          borderColor: '#155FE7',
          pointBackgroundColor: '#155FE7',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#155FE7',
        },
      ],
    };

    const radarOptions: any = {
      elements: {
        line: {
          borderWidth: 2,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: function () {
              return '';
            },
            label: function (context: any) {
              const label = context.chart.data.labels[context.dataIndex] || '';
              const value = context.raw;
              return `${label}: ${value}`;
            },
          },
        },
        legend: {
          display: true,
          position: 'top',
          align: 'center',
          labels: {
            font: {
              size: 14,
              family: 'Inter',
            },
            padding: 300,
          },
        },
      },
      scales: {
        r: {
          min: 1,
            max: 4,
          ticks: {
            beginAtZero: true,
            
            stepSize: 1,
            font: {
              size: 14,
              family: 'Inter',
            },
          },
          pointLabels: {
            font: {
              size: 14,
              color: 'black',
              family: 'Inter',
            },
          },
          suggestedMin: 0,
          suggestedMax: 4
        },
      },
      layout: {
        padding: {
          top: 20,
        },
      },
    };

    const canvas = this.radarEl.nativeElement as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.radarChart = new Chart(canvas, {
        type: 'radar',
        data: radarData,
        options: radarOptions,
      });
    } else {
      console.error('No se pudo obtener el contexto 2D del canvas');
    }
  }
}
