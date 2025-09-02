import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnrentCarComponent } from './unrent-car.component';

describe('UnrentCarComponent', () => {
  let component: UnrentCarComponent;
  let fixture: ComponentFixture<UnrentCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnrentCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnrentCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
