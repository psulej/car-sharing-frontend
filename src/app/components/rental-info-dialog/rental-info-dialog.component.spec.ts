import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalInfoDialogComponent } from './rental-info-dialog.component';

describe('RentalInfoDialogComponent', () => {
  let component: RentalInfoDialogComponent;
  let fixture: ComponentFixture<RentalInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
