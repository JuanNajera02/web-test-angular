import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../../../services/car.service';
import { ItemStoreRelation } from '../../car/models/items.model';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrls: ['./my-purchases.component.css']
})
export class MyPurchasesComponent implements OnInit {

  userId: number = 0;
  purchasedItems: ItemStoreRelation[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('id');
    this.userId = storedUserId ? JSON.parse(storedUserId) : 0;

    if (this.userId) {
      this.carService.getItemsFromCart(this.userId).subscribe({
        next: (data) => {
          // Agrupar por itemId y dateAdded, sumando las cantidades
          this.purchasedItems = this.groupByDateAndItemId(data);
          console.log('Purchased Items:', this.purchasedItems);
        },
        error: (error) => {
          console.error('Error fetching items:', error);
        }
      });
    }
  }

  groupByDateAndItemId(items: any[]): ItemStoreRelation[] {
    const groupedItems: { [key: string]: ItemStoreRelation } = {};

    items.forEach(item => {
      const itemId = item.item?.itemId;
      const dateAdded = item.dateAdded;
      const key = `${itemId}-${dateAdded}`;

      if (groupedItems[key]) {
        // Sumar la cantidad si ya existe el ítem
        groupedItems[key].quantity += 1; // Asumimos que cada item recibido es una unidad, si la cantidad ya es dada en el objeto, usa item.quantity en vez de 1
      } else {
        // Crear una copia del ítem y agregarlo al grupo
        groupedItems[key] = { ...item, quantity: 1 }; // Iniciamos con cantidad 1, asumiendo que cada ítem recibido es una unidad
      }
    });

    // Convertir el objeto agrupado a un array
    return Object.values(groupedItems);
  }
}
