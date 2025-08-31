import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CarPage} from "../models/car-page.model";

// TODO - add url from local profile
const baseUrl = 'http://localhost:8080/api/cars';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCarsPage(phrase: string, pageIndex: number, pageSize: number): Observable<CarPage> {
    const params = `?page=${pageIndex}&size=${pageSize}&phrase=${phrase}`;
    return this.http.get<CarPage>(`${baseUrl}${params}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
