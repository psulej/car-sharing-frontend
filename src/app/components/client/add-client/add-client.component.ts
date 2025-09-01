import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddClientComponent>
  ) {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]]
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
