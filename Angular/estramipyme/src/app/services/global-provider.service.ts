import {computed, inject, Injectable, signal} from '@angular/core';
import {DataProcService} from "@services/data-proc.service";


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

  cliente: number[] = [];
  negocio: number[] = [];
  coherencia: number[] = [];
  alineacion: number[] = [];
  financiera: number[] = [];

  scores = signal<number[]>([])

  // scorers = computed(() => {
  //   console.log("compute scores")
  //   console.log(this.answers())
  //   console.log(this.cliente)
  //   return this.cliente
  // })

  constructor() {
    this.dataProc.getItems('http://localhost:3000/questions').subscribe({
      next: questions => {
        //Obtener los ids
        this.cliente = questions.filter(e => e.section === 'cliente').map(q => q.id);
        this.negocio = questions.filter(e => e.section === 'negocio').map(q => q.id);
        this.coherencia = questions.filter(e => e.section === 'coherencia').map(q => q.id);
        this.alineacion = questions.filter(e => e.section === 'alineacion').map(q => q.id);
        this.financiera = questions.filter(e => e.section === 'financiera').map(q => q.id);
        //console.log(this.answers())

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

    //console.log(this.answers())
    this.scores.set(this.getScores())
    //console.log(this.getScores())
    console.log(this.scores())
  }

  getLocalStorage() {
    const storedDataString = localStorage.getItem("estramipyme");
    if (storedDataString == null) return;
    const data: object = JSON.parse(storedDataString);
    if (!data) return;
    this.answers.set(data);
  }

  getProgress() {
    if (!this.answers()) return 0;
    if (!this.numberOfQuestions) return 0;
    return Math.ceil((Object.keys(this.answers).length / this.numberOfQuestions) * 100);
  }

  getScores() {
    // console.log("this.cliente")
    // console.log(this.cliente)
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

    const answer: Answer = this.answers()
    Object.entries(answer).forEach(([key, value]) => {
      const v = parseInt(value);
      const k = parseInt(key);

      if (key in this.cliente) {
        clientAcc += v;

      }
      if (key in this.negocio) {
        negocioAcc += v;

      }
      if (key in this.coherencia) {
        coherenciaAcc += v;

      }
      if (key in this.alineacion) {
        alineacionAcc += v;

      }
      if (key in this.financiera) {
        financieraAcc += v;
      }
    })

    return [coherenciaAcc / tCoherencia * 4, financieraAcc / tFinanciera * 4, clientAcc / tCliente * 4, alineacionAcc / tAlineacion * 4, negocioAcc / tNegocio * 4];
  }
}

// function getScores() {
//   const respuestas = JSON.parse(localStorage.getItem("estramipyme")) || {};
//
//   const secciones = {
//     1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // IDs de preguntas para Coherencia del modelo de negocio
//     2: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], // IDs de preguntas para Salud financiera
//     3: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], // IDs de preguntas para Conocimiento del cliente
//     4: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40], // IDs de preguntas para Alineación en la comunicación interna
//     5: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50], // IDs de preguntas para Conocimiento del negocio
//   };
//   const scores = {};
//
//   for (let section in secciones) {
//     const preguntas = secciones[section];
//     let suma = 0;
//     let conteo = 0;
//
//     preguntas.forEach((id) => {
//       if (respuestas[id]) {
//         suma += parseInt(respuestas[id], 10); // Convertir a número entero
//         conteo++;
//       }
//     });
//
//     // Calcula el promedio y redondea al entero más cercano
//     scores[section] = conteo ? Math.round(suma / conteo) : 0;
//
//     // Agrega consola.log para depuración
//     console.log(`Sección ${section}:`);
//     console.log(`Preguntas: ${preguntas}`);
//     console.log(`Suma: ${suma}`);
//     console.log(`Conteo: ${conteo}`);
//     console.log(`Puntaje promedio: ${scores[section]}`);
//   }
//   console.log("score", scores);
//   const result = [
//     scores["1"],
//     scores["2"],
//     scores["3"],
//     scores["4"],
//     scores["5"],
//   ];
//   console.log("result", result);
//   return result;
// }

//////////////////////
// const percentage = (count > 0) ? (acum / (count * 4) * 100) : 0;
// console.log("Porcentaje ¿Cómo?:", percentage);
// updateChart(1, percentage);
