import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_CONSTANTS } from '../config/constants';
import { RegisterDataModel } from '@models/registerdata.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  IsLogged$ = this.isLogged.asObservable();

  private apiUrl = API_CONSTANTS.BASE_URL + API_CONSTANTS.AUTH_ENPOINT;

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  register(userData: RegisterDataModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setLogging(value: boolean) {
    this.isLogged.next(value);
  }
}
