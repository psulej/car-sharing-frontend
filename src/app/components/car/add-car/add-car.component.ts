import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  carForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCarComponent>
  ) {
    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(1), Validators.max(10000)]]
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
