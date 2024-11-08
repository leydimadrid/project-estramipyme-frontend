import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_CONSTANTS } from '../config/constants';
import { RegisterDataModel } from '@models/registerdata.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  IsLogged$ = this.isLogged.asObservable();

  private apiUrl = API_CONSTANTS.BASE_URL + API_CONSTANTS.AUTH_ENPOINT;

  constructor(@Inject(HttpClient) private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    this.setLogging(!!token);
  }

  register(userData: RegisterDataModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('authToken', res.token);
          this.setLogging(true);
        }
      })
    );
  }

  setLogging(value: boolean) {
    this.isLogged.next(value);
  }

  logout() {
    localStorage.removeItem('authToken'); // Eliminar el token de localStorage
    this.setLogging(false); // Actualizar el estado de inicio de sesión
  }
}
