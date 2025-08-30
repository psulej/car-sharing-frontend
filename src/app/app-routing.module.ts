import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarsListComponent} from "./components/car/cars-list/cars-list.component";
import {AddCarComponent} from "./components/car/add-car/add-car.component";

const routes: Routes = [
  {path: '', redirectTo: 'cars', pathMatch: 'full'},
  {path: 'cars', component: CarsListComponent},
  // { path: 'cars/:id', component: CarDetailsComponent },
  {path: 'add-car', component: AddCarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
