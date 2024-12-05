import { computed, inject, Injectable, signal } from '@angular/core';
import { DataProcService } from '@services/data-proc.service';
import { BehaviorSubject } from 'rxjs';
import { ReportReoDTO } from '../DTO/reportReoDTO';
import { jwtDecode } from 'jwt-decode';

type Answer =
  | {}
  | {
      [key: number]: string;
    };

export interface Circle {
  what: number[];
  how: number[];
  why: number[];
}

@Injectable({
  providedIn: 'root',
})
export class GlobalProviderService {
  answers = signal<Answer>({});
  private progress = new BehaviorSubject<number>(0);
  numberOfQuestions = 51;
  private dataProc = inject(DataProcService);

  private RadarData: BehaviorSubject<ReportReoDTO[]> = new BehaviorSubject<
    ReportReoDTO[]
  >([]);
  private CircleData: BehaviorSubject<Circle> = new BehaviorSubject({
    what: [90, 10],
    how: [90, 10],
    why: [90, 10],
  });
  Progress$ = this.progress.asObservable();
  RadarData$ = this.RadarData.asObservable();
  CircleData$ = this.CircleData.asObservable();
  cliente: string[] = [];
  negocio: string[] = [];
  coherencia: string[] = [];
  alineacion: string[] = [];
  financiera: string[] = [];
  circuloQue!: string[];
  circuloComo!: string[];
  circuloPorQue!: string[];
  scores = computed(() => {
    console.log('compute scores');
    console.log(this.answers());
    return this.getScores();
  });

  constructor() {}

  setLocalStorage(id: number | string, value: string) {
    const newValue = {
      [id]: value,
    };

    this.answers.update((prevValue) => {
      return { ...prevValue, ...newValue };
    });
    localStorage.setItem('estramipyme', JSON.stringify(this.answers()));
    this.getCircleData();
  }

  getLocalStorage() {
    const storedDataString = localStorage.getItem('estramipyme');
    if (storedDataString == null) return;
    const data: object = JSON.parse(storedDataString);
    if (!data) return;
    this.answers.update(() => {
      return { ...this.answers(), ...data };
    });
    this.getCircleData();
  }

  getUserEmail(): string {
    let token = sessionStorage.getItem('authToken');
    let resultado = '';
    if (token != null) {
      const info = jwtDecode(token);
      resultado = info.sub ?? '';
    }
    return resultado;
  }

  getProgress() {
    console.log('progress');
    this.progress.next(Math.ceil(50));
  }

  getScores(): number[] {
    return [5, 5, 5, 5, 5];
  }

  getCircle() {
    let comoAcc = 0;
    let queAcc = 0;
    let porQueAcc = 0;
    const total = 4;

    Object.entries(this.answers()).forEach(([key, value]) => {
      if (this.circuloQue.includes(key)) {
        queAcc += Number(value);
      }
      if (this.circuloComo.includes(key)) {
        comoAcc += Number(value);
      }
      if (this.circuloPorQue.includes(key)) {
        porQueAcc += Number(value);
      }
    });

    return {
      what: [(queAcc / (total * 4)) * 100, 100 - (queAcc / (total * 4)) * 100],
      how: [(comoAcc / (total * 4)) * 100, 100 - (comoAcc / (total * 4)) * 100],
      why: [
        (porQueAcc / (total * 4)) * 100,
        100 - (porQueAcc / (total * 4)) * 100,
      ],
    };
  }

  public updateRadarData(newData: ReportReoDTO[]): void {
    this.RadarData.next(newData);
  }

  public updateCircleData(newData: Circle): void {
    this.CircleData.next(newData);
  }

  getCircleData() {
    this.CircleData.next(this.getCircle());
  }

  reset() {
    this.answers.set({});
    localStorage.removeItem('estramipyme');
    this.progress.next(0);
  }
}
