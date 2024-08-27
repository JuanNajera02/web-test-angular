import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../../../../services/car.service';
import { ItemStoreRelation } from '../models/items.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores-with-items',
  templateUrl: './stores-with-items.component.html',
  styleUrls: ['./stores-with-items.component.css']
})
export class StoresWithItemsComponent implements OnInit {
  items: ItemStoreRelation[] = [];
  storeId: number = 0;
  pagedItems: ItemStoreRelation[] = [];
  userid: number = 0;
  // Variables para la paginación
  pageIndex: number = 0;
  pageSize: number = 8;
  totalItems: number = 0;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private Router: Router
  ) {}

  ngOnInit(): void {
    //obtiene el id del usuario del local storage
    this.userid = JSON.parse(localStorage.getItem('id') || '{}');
    this.route.paramMap.subscribe(params => {
      this.storeId = +params.get('id')!;

      this.loadItems();
    });
  }

  loadItems(): void {
    this.carService.getItemsFromStore(this.storeId).subscribe((data: ItemStoreRelation[]) => {
      // Filtrar los ítems para excluir los que tienen stock 0
      this.items = data
        .filter(item => item.item.stock > 0) // Filtrar ítems con stock > 0
        .map(item => ({ ...item, quantity: 1 }));

      this.totalItems = this.items.length;
      this.updatePagedItems();
      console.log('Items:', this.items);
    });
  }

  // Método para actualizar los ítems paginados
  updatePagedItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedItems = this.items.slice(startIndex, endIndex);
  }

  // Método para manejar el cambio de página
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedItems();
  }

  // Agrega el item al carrito
  addToCart(item: ItemStoreRelation): void {
    const itemToAdd = { ...item, quantity: item.quantity };

    if (itemToAdd.quantity > item.item.stock) {
      alert('La cantidad seleccionada supera el stock disponible.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemInCart = cart.find((cartItem: any) => cartItem.item.itemId === item.item.itemId);



    if (itemInCart) {
      // Acumula la cantidad en el carrito, sin superar el stock disponible
      itemInCart.quantity += itemToAdd.quantity;
      if (itemInCart.quantity > item.item.stock) {
        itemInCart.quantity = item.item.stock;
        alert('La cantidad total seleccionada supera el stock disponible. Se ajustó al stock máximo.');
      }
    } else {
      // Añade el ítem con la cantidad seleccionada
      cart.push(itemToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item agregado al carrito.');
  }

  // Comprar el item (puedes personalizarlo más adelante)
  // Agrega el item al carrito
  buyNow(item: ItemStoreRelation): void {
    const itemToAdd = { ...item, quantity: item.quantity };

    if (itemToAdd.quantity > item.item.stock) {
      alert('La cantidad seleccionada supera el stock disponible.');
      return;
    }

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemInCart = cart.find((cartItem: any) => cartItem.item.itemId === item.item.itemId);

    if (itemInCart) {
      // Acumula la cantidad en el carrito, sin superar el stock disponible
      itemInCart.quantity += itemToAdd.quantity;
      if (itemInCart.quantity > item.item.stock) {
        itemInCart.quantity = item.item.stock;
        alert('La cantidad total seleccionada supera el stock disponible. Se ajustó al stock máximo.');
      }
    } else {
      // Añade el ítem con la cantidad seleccionada
      cart.push(itemToAdd);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item agregado al carrito.');


    //redirije al componente de cartopay
    this.Router.navigate(['/car-to-pay']);

  }

}
