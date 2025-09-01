import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-rental-info-dialog',
  template: `
    <h2 mat-dialog-title>Rental Details</h2>
    <mat-dialog-content>
      <table>
        <tr><td><b>Rental ID:</b></td><td>{{ data.rentalId }}</td></tr>
        <tr><td><b>Car ID:</b></td><td>{{ data.carId }}</td></tr>
        <tr><td><b>Client ID:</b></td><td>{{ data.clientId }}</td></tr>
        <tr><td><b>Start:</b></td><td>{{ data.rentStart | date:'short' }}</td></tr>
        <tr><td><b>End:</b></td><td>{{ data.rentEnd | date:'short' }}</td></tr>
        <tr><td><b>Total Price:</b></td><td>{{ data.totalPrice | currency }}</td></tr>
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
