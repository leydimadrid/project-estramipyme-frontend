import {Injectable, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "@models/question.model";
import {SectorOption} from "@models/sector.model";

@Injectable({
  providedIn: 'root'
})
export class DataProcService {
  private http = inject(HttpClient);

  getItems(url: string) {
    return this.http.get <Question[]>(url)
  }

  sendData(url: string, data: any) {
    return this.http.post(url, data)
  }

  getData(url: string) {
    return this.http.get(url)
  }

  //traer los datos del Json-server


}
