import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-pay-list',
  templateUrl: './pay-list.component.html',
  styleUrls: ['./pay-list.component.css']
})
export class PayListComponent implements OnInit {
  cart: any[] = [];
  userId: number = 0;


  constructor(private carService: CarService) {

  }

  ngOnInit(): void {
    // Obtener el carrito del localStorage
    const storedCart = localStorage.getItem('cart');
    const storedUserId = localStorage.getItem('id');
    this.userId = storedUserId ? JSON.parse(storedUserId) : 0;
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      console.log('Carrito:', this.cart);
    }
  }

  // Actualizar la cantidad de un ítem en el carrito
  updateQuantity(item: any, event: any): void {
    const newQuantity = parseInt(event.target.value, 10);

    // Verificar que la nueva cantidad no exceda el stock disponible
    if (newQuantity > item.item.stock) {
      alert(`La cantidad seleccionada supera el stock disponible (${item.item.stock}).`);
      item.quantity = item.item.stock; // Ajustar la cantidad al stock máximo disponible
    } else if (newQuantity < 1) {
      this.removeItem(item); // Si la cantidad es menor a 1, se elimina el ítem
    } else {
      item.quantity = newQuantity; // Actualizar la cantidad con la nueva cantidad ingresada
    }

    this.saveCart(); // Guardar el carrito actualizado en el localStorage
  }

  // Eliminar un ítem del carrito
  removeItem(item: any): void {
    this.cart = this.cart.filter(cartItem => cartItem.item.itemId !== item.item.itemId);
    this.saveCart();
  }

  // Guardar el carrito actualizado en el localStorage
  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + item.item.price * item.quantity, 0);
  }

  pay(): void {
    // Crear un arreglo con los ítems repetidos según la cantidad
    const itemsArray = this.cart.reduce((acc, item) => {
      for (let i = 0; i < item.quantity; i++) {
        acc.push(item.item.itemId);
      }
      return acc;
    }, []);

    // Crear el objeto de payload
    const payload = {
      ClientId: this.userId,
      Items: itemsArray
    };

    console.log('Datos a enviar al backend:', payload);

    this.carService.addItemToCart(payload).subscribe({
      next: () => {
        alert('Items pagados con éxito');
        this.cart = []; // Limpiar el carrito después de pagar
        localStorage.removeItem('cart'); // Eliminar el carrito del localStorage
      },
      error: (error) => {
        alert('Hubo un error al pagar los items');
      }
    });
  }

}
