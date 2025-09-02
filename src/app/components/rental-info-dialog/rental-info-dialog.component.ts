import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rental-info-dialog',
  template: `
    <h2 mat-dialog-title>Rental Details</h2>
    <mat-dialog-content>
      <table>
        <tr><td><b>Rental ID:</b></td><td>{{ data.rentalInfo.rentalId }}</td></tr>
        <tr><td><b>Name:</b></td><td>{{ data.clientInfo.firstName }}</td></tr>
        <tr><td><b>Last name:</b></td><td>{{ data.clientInfo.lastName }}</td></tr>
        <tr><td><b>Email:</b></td><td>{{ data.clientInfo.email }}</td></tr>
        <tr><td><b>Brand:</b></td><td>{{ data.car.brand }}</td></tr>
        <tr><td><b>Model:</b></td><td>{{ data.car.model }}</td></tr>
        <tr><td><b>Price per day:</b></td><td>{{ data.car.pricePerDay }}</td></tr>
        <tr><td><b>Status</b></td><td>{{ data.car.status }}</td></tr>
        <tr><td><b>Start:</b></td><td>{{ data.rentalInfo.rentStart | date:'short' }}</td></tr>
        <tr><td><b>End:</b></td><td>{{ data.rentalInfo.rentEnd | date:'short' }}</td></tr>
        <tr><td><b>Total Price:</b></td><td>{{ data.rentalInfo.totalPrice | currency }}</td></tr>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    table {
      width: 100%;
      border-spacing: 8px;
    }
    td:first-child {
      font-weight: bold;
      width: 120px;
    }
  `]
})
export class RentalInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
