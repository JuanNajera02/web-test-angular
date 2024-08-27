import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresCardsComponent } from './stores-cards.component';

describe('StoresCardsComponent', () => {
  let component: StoresCardsComponent;
  let fixture: ComponentFixture<StoresCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoresCardsComponent]
    });
    fixture = TestBed.createComponent(StoresCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
