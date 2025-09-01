import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RentalsService } from '../../services/rentals.service';
import { ClientService } from '../../services/client.service';
import { Car } from 'src/app/models/car.model';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.css']
})
export class AddRentalComponent implements OnInit {
  rentalForm: FormGroup;
  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddRentalComponent>,
    private rentalService: RentalsService,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car, clientId?: number }
  ) {
    this.rentalForm = this.fb.group({
      clientId: [null, Validators.required],
      rentStart: [null, Validators.required],
      rentEnd: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientService.getClientsPage('', 0, 50).subscribe({
      next: (page) => {
        this.clients = page.content;
        this.setSelectedClient();
      },
      error: (err) => console.error('Error fetching clients:', err)
    });
  }

  private setSelectedClient() {
    if (this.data?.clientId) {
      const clientToSelect = this.clients.find(client => client.id === this.data.clientId);
      if (clientToSelect) {
        setTimeout(() => {
          this.rentalForm.patchValue({
            clientId: clientToSelect.id
          });
        });
      }
    }
  }

  submit() {
    if (this.rentalForm.valid) {
      const { clientId, rentStart, rentEnd } = this.rentalForm.value;
      this.rentalService.createRental(
        this.data.car.carId, clientId.clientId, rentStart.toISOString(), rentEnd.toISOString()
      ).subscribe({
        next: (res) => this.dialogRef.close(res),
        error: (err) => console.error('Error creating rental:', err)
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
