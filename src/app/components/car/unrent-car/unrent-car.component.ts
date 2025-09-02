import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../../models/car.model";
import {RentalsService} from "../../../services/rentals.service";

@Component({
  selector: 'app-unrent-car',
  templateUrl: './unrent-car.component.html',
  styleUrls: ['./unrent-car.component.css']
})
export class UnrentCarComponent {

  constructor(
    private rentalService: RentalsService,
    private dialogRef: MatDialogRef<UnrentCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car }
  ) { }

  submit() {
    this.rentalService.finishRental(this.data.car.carId).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => console.error(err)
    });
  }


  cancel() {
    this.dialogRef.close();
  }
}
