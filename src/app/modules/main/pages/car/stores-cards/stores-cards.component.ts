import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../../../../services/car.service';
import { stores } from '../models/stores.model';

@Component({
  selector: 'app-stores-cards',
  templateUrl: './stores-cards.component.html',
  styleUrls: ['./stores-cards.component.css']
})
export class StoresCardsComponent implements OnInit {
  stores: stores[] = [];

  constructor(
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carService.getStores().subscribe((data: stores[]) => {
      this.stores = data;
    });
  }

  viewStore(storeId: any): void {
    this.router.navigate(['/stores-with-items', storeId]);
  }
}
