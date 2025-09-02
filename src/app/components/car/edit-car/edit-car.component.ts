import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../../models/car.model";

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car }
  ) {

    console.log("data {}", this.data.car)
    this.carForm = this.fb.group({
      brand: [this.data.car.brand ?? '', Validators.required],
      model: [this.data.car.model ?? '', Validators.required],
      costPerDay: [
        this.data.car.pricePerDay != null ? Number(this.data.car.pricePerDay) : '',
        [Validators.required, Validators.min(1), Validators.max(10000)]
      ]
    });

  }


  submit() {
    if (this.carForm.valid) {
      console.log(this.carForm);
      this.dialogRef.close(this.carForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
