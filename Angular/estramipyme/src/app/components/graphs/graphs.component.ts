import {
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  OnInit,
  signal, effect,
  SimpleChanges, OnChanges
} from '@angular/core';
import {CommonModule} from "@angular/common";
import Chart, {
  ChartConfiguration,
  ChartConfigurationCustomTypesPerDataset,
  ChartTypeRegistry,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js/auto";
//import {DataProcService} from './../../services/data-proc.service';
import {GlobalProviderService} from "@services/global-provider.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-graphs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.css'
})
export class GraphsComponent implements OnInit {
  private el: ElementRef;
  radarCtx: HTMLHtmlElement | any;

  private provider = inject(GlobalProviderService)

  RadarConfig = computed(() => {
    return {
      type: "radar",
      data: this.data(),
      options: this.radarOptions,
    }

  })
  radarChart: any;


  ngOnInit() {

    this.radarCtx = this.el.nativeElement.querySelector(".myChart").getContext("2d")

    // console.log("this.provider.scores()");
    ///this.provider.getScores().subscribe()
    // console.log(this.provider.scores());
    // this.data.set(this.provider.scores())
    const config = this.RadarConfig() as ChartConfiguration<keyof ChartTypeRegistry, number[], string> | ChartConfigurationCustomTypesPerDataset<keyof ChartTypeRegistry, number[], string>

    //console.log(this.provider.scores())
    this.radarChart = new Chart(this.radarCtx, config);

    // this.dataService.getData().subscribe((data: any[]) => {
    //   this.data = data;
    // });

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log("changes")
  //   console.log(changes)
  //   console.log("l3onnard changes")
  // }

  // ngDoCheck() {
  //   console.log("do check")
  // }
  getData() {
    console.log("getData");
    //console.log(this.provider.scores())
    return {
      labels: [
        "Coherencia del modelo de negocio",
        "Salud financiera",
        "Conocimiento del cliente",
        "Alineación en la comunicación interna",
        "Conocimiento del negocio",
      ],
      datasets: [
        {
          label: "Tu Radar",
          data: this.provider.scores(),
          fill: true,
          backgroundColor: "rgba(91, 100, 175, 0.2)",
          borderColor: "#5B64AF",
          pointBackgroundColor: "#5B64AF",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#5B64AF",
        },
        {
          label: "Ideal",
          data: [4, 4, 4, 4, 4],
          fill: false,
          backgroundColor: "rgba(88, 176, 168, 0.2)",
          borderColor: "#58B0A8",
          pointBackgroundColor: "#58B0A8",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#58B0A8",
        },
      ],
    };
  }


  // radarData = {
  //   labels: [
  //     "Coherencia del modelo de negocio",
  //     "Salud financiera",
  //     "Conocimiento del cliente",
  //     "Alineación en la comunicación interna",
  //     "Conocimiento del negocio",
  //   ],
  //   datasets: [
  //     {
  //       label: "Tu Radar",
  //       data: this.provider.scores(),
  //       fill: true,
  //       backgroundColor: "rgba(91, 100, 175, 0.2)",
  //       borderColor: "#5B64AF",
  //       pointBackgroundColor: "#5B64AF",
  //       pointBorderColor: "#fff",
  //       pointHoverBackgroundColor: "#fff",
  //       pointHoverBorderColor: "#5B64AF",
  //     },
  //     {
  //       label: "Ideal",
  //       data: [4, 4, 4, 4, 4],
  //       fill: false,
  //       backgroundColor: "rgba(88, 176, 168, 0.2)",
  //       borderColor: "#58B0A8",
  //       pointBackgroundColor: "#58B0A8",
  //       pointBorderColor: "#fff",
  //       pointHoverBackgroundColor: "#fff",
  //       pointHoverBorderColor: "#58B0A8",
  //     },
  //   ],
  // };


  data = computed(() => {
    return this.getData()
  });

  radarOptions = {
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
      legend: {
        labels: {
          font: {
            size: 16,
            family: "Lato",
          },
        },
      },
    },
    scales: {
      r: {
        ticks: {
          z: 10,
          beginAtZero: true,
          max: 4,
          stepSize: 1,
          font: {
            size: 16,
            family: "Lato",
          },
        },
        pointLabels: {
          font: {
            size: 16,
            color: "black",
            family: "Lato",
          },
        },
      },
    },
  };

  constructor(el: ElementRef) {
    this.el = el;

    //this.subscription = globalProvider.

    // Chart.register(
    //   RadarController,
    //   RadialLinearScale,
    //   PointElement,
    //   LineElement,
    //   Filler,
    //   Tooltip,
    //   Legend
    // );

    effect(() => {
      //console.log(this.answers())
      //console.log("EFFECT");
      //this.getScores()
      //this.scores.update(prevValue => [...this.getScores()])
      // console.log(this.scores())

      //console.log('this is the valued computer')
      console.log(this.data())
      console.log("hubo un cambio")
      this.getData()
      // console.log(this.answers())
      // console.log(this.scores())
      console.log(this.RadarConfig())
      if (this.radarChart) {
        console.log("radar chart E")
        //this.radarChart.setOptions(this.radarOptions);
        console.log("options")
        console.log(this.radarChart);
        //this.radarChart.data(this.data())
        //this.radarChart
        console.log(this.data())

        this.radarChart.data = this.data()
        this.radarChart.draw()
        //Object.assign(this.radarChart.data, this.data())

      }

      console.log("scorese")
      console.log(this.provider.scores());

      //console.log(this.data());
      // console.log(this.radarChart)
      // if (this.radarChart) {
      //   console.log("radar config")
      //   this.radarChart.config = this.RadarConfig()
      // }
    });


  }

}
