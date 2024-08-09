import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {DataProcService} from "@services/data-proc.service";
import {BehaviorSubject} from "rxjs";

type Answer = {} | {
  [key: number]: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {
  answers = signal<Answer>({})
  numberOfQuestions = 51;
  private dataProc = inject(DataProcService)

  private RadarData: BehaviorSubject<number[]> = new BehaviorSubject([1, 2, 3, 4, 5])
  RadarData$ = this.RadarData.asObservable();
  cliente: string[] = [];
  negocio: string[] = [];
  coherencia: string[] = [];
  alineacion: string[] = [];
  financiera: string[] = [];

  scores = computed(() => {
    console.log("compute scores")
    console.log(this.answers())
    //console.log(this.cliente)
    return this.getScores()
  })

  constructor() {
    this.dataProc.getItems('http://localhost:3000/questions').subscribe({
      next: questions => {
        //Obtener los ids
        this.cliente = questions.filter(e => e.section === 'cliente').map(q => String(q.id));
        this.negocio = questions.filter(e => e.section === 'negocio').map(q => String(q.id));
        this.coherencia = questions.filter(e => e.section === 'coherencia').map(q => String(q.id));
        this.alineacion = questions.filter(e => e.section === 'alineacion').map(q => String(q.id));
        this.financiera = questions.filter(e => e.section === 'financiera').map(q => String(q.id));
        //console.log(this.answers())
        //console.log("ruuun")
      },
      error: err => {
        console.log(err)
      }
    })
  }

  setLocalStorage(id: number | string, value: string) {
    const newValue = {
      [id]: value
    }

    this.answers.update((prevValue) => {
      return {...prevValue, ...newValue}
    })
    localStorage.setItem("estramipyme", JSON.stringify(this.answers()));
    this.getRadarData()
  }

  getLocalStorage() {
    const storedDataString = localStorage.getItem("estramipyme");
    if (storedDataString == null) return;
    const data: object = JSON.parse(storedDataString);
    if (!data) return;
    this.answers.update(() => {
      return {...this.answers(), ...data}
    });
  }

  getProgress() {
    if (!this.answers()) return 0;
    if (!this.numberOfQuestions) return 0;
    return Math.ceil((Object.keys(this.answers).length / this.numberOfQuestions) * 100);
  }

  getScores() {
    let clientAcc = 0;
    let negocioAcc = 0;
    let coherenciaAcc = 0;
    let alineacionAcc = 0;
    let financieraAcc = 0;
    const tCliente = +this.cliente.length
    const tNegocio = +this.negocio.length
    const tCoherencia = +this.coherencia.length
    const tAlineacion = +this.alineacion.length
    const tFinanciera = +this.financiera.length


    Object.entries(this.answers()).forEach(([key, value]) => {
      //console.log(key, value);

      if (this.cliente.includes(key)) {
        clientAcc += Number(value);
      }
      if (this.negocio.includes(key)) {
        negocioAcc += Number(value);
      }
      if (this.coherencia.includes(key)) {
        coherenciaAcc += Number(value);
      }
      if (this.alineacion.includes(key)) {
        alineacionAcc += Number(value);
      }
      if (this.financiera.includes(key)) {
        financieraAcc += Number(value);
      }
    })

    return [
      coherenciaAcc / (tCoherencia * 4) * 4,
      financieraAcc / (tFinanciera * 4) * 4,
      clientAcc / (tCliente * 4) * 4,
      alineacionAcc / (tAlineacion * 4) * 4,
      negocioAcc / (tNegocio * 4) * 4
    ];
  }

  getRadarData() {
    this.RadarData.next(
      this.getScores()
    )
  }
}
