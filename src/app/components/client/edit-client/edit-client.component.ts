import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Car} from "../../../models/car.model";
import {Client} from "../../../models/client.model";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditClientComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { client: Client }
  ) {
    this.clientForm = this.fb.group({
      firstName: [this.data.client.firstName, Validators.required],
      lastName: [this.data.client.lastName, Validators.required],
      email: [this.data.client.email, [Validators.required]]
    });
  }

  submit() {
    if (this.clientForm.valid) {
      console.log(this.clientForm);
      this.dialogRef.close(this.clientForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
