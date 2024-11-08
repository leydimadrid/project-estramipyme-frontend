import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);
  IsLogged$ = this.isLogged.asObservable();

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  setLogging(value: boolean) {
    this.isLogged.next(value);
  }
}
