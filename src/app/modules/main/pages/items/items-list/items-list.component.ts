import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';
import { ItemList } from '../models/itemList.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items: ItemList[] = [];
  displayedColumns: string[] = ['code', 'description', 'price', 'stock', 'image', 'actions']; // Añadido 'actions'

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemsService.getItems().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (error) => {
        console.error('Error fetching items:', error);
      }
    });
  }

  editItem(item: ItemList): void {
    this.itemsService.setCurrentItem(item); // Usa el servicio para establecer el artículo actual
    console.log('Edit item:', item);
  }

  deleteItem(itemId: number): void {
    this.itemsService.deleteItem(itemId).subscribe({
      next: () => {
        this.loadItems(); // Recargar la lista después de eliminar
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      }
    });
  }

}
