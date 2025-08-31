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

  getPaginatedCars(): Observable<CarPage> {
    return this.http.get<CarPage>(baseUrl);
  }

  getCarsPage(id: any): Observable<CarPage> {
    return this.http.get(`${baseUrl}/${id}`);
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
