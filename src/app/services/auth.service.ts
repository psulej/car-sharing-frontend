import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginRequest} from "../models/login-request.model";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginRequest: LoginRequest = { username, password };
    return this.http.post(AUTH_API + 'login', loginRequest, httpOptions);
  }

  saveToken(token: string): void {
    localStorage.setItem('auth-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  logout(): void {
    localStorage.removeItem('auth-token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
