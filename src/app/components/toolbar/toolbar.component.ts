import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(public storageService: StorageService, private router: Router) {}

  logout(): void {
    this.storageService.logout();
    this.router.navigate(['/login']);
  }
}
