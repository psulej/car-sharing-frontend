import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {AddCarComponent} from "../add-car/add-car.component";
import {CarService} from "../../../services/car.service";
import {Car} from "../../../models/car.model";
import {CarPage} from "../../../models/car-page.model";
import {RentalsService} from "../../../services/rentals.service";
import {RentalInfoDialogComponent} from "../../rental-info-dialog/rental-info-dialog.component";
import {AddRentalComponent} from "../../add-rental/add-rental.component";
import {ClientService} from "../../../services/client.service";
import {EditCarComponent} from "../edit-car/edit-car.component";
import {UnrentCarComponent} from "../unrent-car/unrent-car.component";


@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, AfterViewInit {

  constructor(private dialog: MatDialog, private carService: CarService, private rentalService: RentalsService, private clientService: ClientService) {
  }

  displayedColumns: string[] = ['id', 'brand', 'model', 'costPerDay', 'status', 'actions'];

  dataSource = new MatTableDataSource<Car>();
  totalElements: any = 0;
  pageSize: any = 5;
  pageIndex: any = 0;
  phrase: string = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadPage(this.phrase, this.pageIndex, this.pageSize)
  }

  loadPage(phrase: string, pageIndex: number, pageSize: number): void {
    this.carService.getCarsPage(phrase, pageIndex, pageSize).subscribe({
      next: (carPage: CarPage) => {
        this.dataSource.data = carPage.content || [];
        this.totalElements = carPage.page.totalElements
      },
      error: (err) => console.error(err)
    });
  }

  onPageChange(event: PageEvent): void {
    console.log("event {} ", event)
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPage(this.phrase, this.pageIndex, this.pageSize);
  }

  addCar() {
    const dialogRef = this.dialog.open(AddCarComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newCar = {
          brand: result.brand,
          model: result.model,
          pricePerDay: result.cost,
          status: result.status
        };

        this.carService.create(newCar).subscribe({
          next: (createdCar) => {
            console.log('Car created:', createdCar);
            this.dataSource.data = [createdCar, ...this.dataSource.data];
          },
          error: (err) => console.error(err)
        });
      }
    });
  }


  editCar(car: Car): void {
    const dialogRef = this.dialog.open(EditCarComponent, {
      width: '500px',
      data: { car }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedCar: Car = {
          ...car,
          brand: result.brand,
          model: result.model,
          pricePerDay: result.costPerDay
        };

        this.carService.update(car.carId, updatedCar).subscribe({
          next: (res) => {
            const index = this.dataSource.data.findIndex(c => c.carId === res.carId);
            if (index > -1) {
              this.dataSource.data[index].brand = res.brand;
              this.dataSource.data[index].model = res.model;
              this.dataSource.data[index].pricePerDay = res.pricePerDay;
              this.dataSource.data[index].status = res.status;
              this.dataSource._updateChangeSubscription();
            }
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  deleteCar(car: Car): void {
    this.carService.delete(car.carId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(c => c.carId !== car.carId);
        this.loadPage(this.phrase, this.pageIndex, this.pageSize)
      },
      error: (err) => console.error(err)
    });
  }

  onInputChange(event: any) {
    this.phrase = event.target.value;
    this.loadPage(this.phrase, this.pageIndex, this.pageSize);
  }


  showRentalInfo(car: Car) {
    this.rentalService.getRentalInfo(car.carId).subscribe({
      next: (rentalInfo) => {
        this.clientService.getClientById(rentalInfo.clientId).subscribe({
          next: (clientInfo) => {
            this.dialog.open(RentalInfoDialogComponent, {
              width: '400px',
              data: {
                car: car,
                rentalInfo: rentalInfo,
                clientInfo: clientInfo
              }
            });
          },
          error: (err) => console.error('Error fetching client info:', err)
        });
      },
      error: (err) => console.error('Error fetching rental info:', err)
    });
  }


  rentCar(car: Car) {
    const dialogRef = this.dialog.open(AddRentalComponent, {
      width: '400px',
      data: { car }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("refresh rent car")
        this.loadPage(this.phrase, this.pageIndex, this.pageSize)
      }
    });
  }

  unrentCar(car: Car): void {

    const dialogRef = this.dialog.open(UnrentCarComponent, {
      width: '400px',
      data: { car }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("refresh unrent car");
        this.loadPage(this.phrase, this.pageIndex, this.pageSize);
      }
    });
  }
}
