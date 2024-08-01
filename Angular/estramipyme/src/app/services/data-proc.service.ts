import {Injectable, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "@models/question.model";

@Injectable({
  providedIn: 'root'
})
export class DataProcService {
  private http = inject(HttpClient);

  getItems(url: string) {
    return this.http.get <Question[]>(url)
  }

  //traer los datos del Json-server


}
