import { Component, OnInit } from '@angular/core';
import { StoresService } from 'src/app/services/stores.service';
import { Store } from '../models/store.model';
import { Router } from '@angular/router';
import { ItemStoreRelation } from '../models/items.store.model';

@Component({
  selector: 'app-stores-list',
  templateUrl: './stores-list.component.html',
  styleUrls: ['./stores-list.component.css']
})
export class StoresListComponent implements OnInit {
  stores: Store[] = [];
  displayedColumns: string[] = ['branch', 'address', 'actions'];


  constructor(private storesService: StoresService, private router: Router) {}

  ngOnInit(): void {
    this.storesService.stores$.subscribe(stores => {
      this.stores = stores;
    });
  }

  editStore(store: Store): void {
    this.storesService.setCurrentStore(store);

    console.log('Edit store:', store);
  }


  deleteStore(storeId: number): void {
    console.log('Delete store:', storeId);
    if (confirm('¿Estás seguro de que quieres eliminar esta tienda?')) {
      this.storesService.deleteStore(storeId).subscribe(() => {
        this.stores = this.stores.filter(store => store.storeId !== storeId);
      });
    }
  }
}
