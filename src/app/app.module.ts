import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddCarComponent } from './components/car/add-car/add-car.component';
import { CarsListComponent } from './components/car/cars-list/cars-list.component';
import { ClientsListComponent } from './components/client/clients-list/clients-list.component';
import { AddClientComponent } from './components/client/add-client/add-client.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatIconModule} from "@angular/material/icon";
import { MatSortModule } from '@angular/material/sort';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {MatCardModule} from "@angular/material/card";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import { RentalInfoDialogComponent } from './components/rental-info-dialog/rental-info-dialog.component';
import {AddRentalComponent} from "./components/add-rental/add-rental.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { EditCarComponent } from './components/car/edit-car/edit-car.component';
import { UnrentCarComponent } from './components/car/unrent-car/unrent-car.component';
import { EditClientComponent } from './components/client/edit-client/edit-client.component';


@NgModule({
  declarations: [
    AppComponent,
    AddCarComponent,
    CarsListComponent,
    ClientsListComponent,
    AddClientComponent,
    ToolbarComponent,
    LoginPageComponent,
    RentalInfoDialogComponent,
    AddRentalComponent,
    EditCarComponent,
    UnrentCarComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Angular Material
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
