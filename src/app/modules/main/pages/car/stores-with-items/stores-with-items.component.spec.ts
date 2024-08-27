import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresWithItemsComponent } from './stores-with-items.component';

describe('StoresWithItemsComponent', () => {
  let component: StoresWithItemsComponent;
  let fixture: ComponentFixture<StoresWithItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoresWithItemsComponent]
    });
    fixture = TestBed.createComponent(StoresWithItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
