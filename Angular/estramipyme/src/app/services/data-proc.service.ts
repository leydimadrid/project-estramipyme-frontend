import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataProcService {
  //traer los datos del Json-server
  
  private apiUrl = 'http://localhost:3000/questions'

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateData(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
