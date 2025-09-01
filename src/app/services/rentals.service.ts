import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

// TODO - add url from local profile
const baseUrl = 'http://localhost:8080/api/rentals';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(private http: HttpClient) { }

  getRentalInfo(carId: any): Observable<any> {
    return this.http.get<any>(`${baseUrl}/cars/${carId}`);
  }

  createRental(carId: any, clientId: number, rentStart: any, rentEnd: any): Observable<any> {
    const rental = { carId, clientId, rentStart, rentEnd };
    return this.http.post(baseUrl, rental);
  }
}
