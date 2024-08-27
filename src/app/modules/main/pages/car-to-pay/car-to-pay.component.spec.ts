import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarToPayComponent } from './car-to-pay.component';

describe('CarToPayComponent', () => {
  let component: CarToPayComponent;
  let fixture: ComponentFixture<CarToPayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarToPayComponent]
    });
    fixture = TestBed.createComponent(CarToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
