import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { CarsListComponent } from './components/car/cars-list/cars-list.component';
import { ClientsListComponent } from './components/client/clients-list/clients-list.component';
import { AddClientComponent } from './components/client/add-client/add-client.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    CarsListComponent,
    ClientsListComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
