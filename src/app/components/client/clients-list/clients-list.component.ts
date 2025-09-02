import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Client } from "../../../models/client.model";
import { ClientPage } from "../../../models/client-page.model";
import { ClientService } from "../../../services/client.service";
import { AddClientComponent } from "../add-client/add-client.component";
import { EditClientComponent } from "../edit-client/edit-client.component";

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  dataSource = new MatTableDataSource<Client>();
  totalElements: any = 0;
  pageSize: any = 5;
  pageIndex: any = 0;
  phrase: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private clientService: ClientService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadPage(this.phrase, this.pageIndex, this.pageSize);
  }

  loadPage(phrase: string, pageIndex: number, pageSize: number): void {
    this.clientService.getClientsPage(phrase, pageIndex, pageSize).subscribe({
      next: (clientPage: ClientPage) => {
        this.dataSource.data = clientPage.content || [];
        this.totalElements = clientPage.page.totalElements;
      },
      error: (err) => console.error(err)
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPage(this.phrase, this.pageIndex, this.pageSize);
  }

  addClient() {
    const dialogRef = this.dialog.open(AddClientComponent, { width: '500px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newClient = {
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email
        };

        this.clientService.create(newClient).subscribe({
          next: (createdClient) => {
            console.log('Client created:', createdClient);
            this.dataSource.data = [createdClient, ...this.dataSource.data];
          },
          error: (err) => console.error(err)
        });
      }
    });
  }


  editClient(client: Client): void {
    const dialogRef = this.dialog.open(EditClientComponent, { width: '500px', data: { client } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedClient: Client = {
          ...client,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email
        };

        this.clientService.update(client.clientId, updatedClient).subscribe({
          next: (res) => {
            const index = this.dataSource.data.findIndex(c => c.clientId === client.clientId);
            if (index > -1) {
              this.dataSource.data[index] = res;
              this.dataSource._updateChangeSubscription();
            }
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  deleteClient(client: Client): void {
    this.clientService.delete(client.clientId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(c => c.clientId !== client.clientId);
        this.loadPage(this.phrase, this.pageIndex, this.pageSize);
      },
      error: (err) => console.error(err)
    });
  }

  onInputChange(event: any) {
    this.phrase = event.target.value;
    this.loadPage(this.phrase, this.pageIndex, this.pageSize);
  }
}
