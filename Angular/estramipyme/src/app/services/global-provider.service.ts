import {Injectable, signal} from '@angular/core';


type Answer = {} | {
  [key: number]: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalProviderService {
  answers = signal<Answer>({})
  numberOfQuestions = 51;

  setLocalStorage(id: number | string, value: string) {
    const newValue = {
      [id]: value
    }

    this.answers.update((prevValue) => {
      return {...prevValue, ...newValue}
    })
    localStorage.setItem("estramipyme", JSON.stringify(this.answers()));

    console.log(this.answers())
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
}
