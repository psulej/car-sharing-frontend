import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarsListComponent} from "./components/car/cars-list/cars-list.component";
import {ClientsListComponent} from "./components/client/clients-list/clients-list.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";


import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'cars', component: CarsListComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
