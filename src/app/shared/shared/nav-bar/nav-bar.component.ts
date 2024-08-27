import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) {}

  goToItems(): void {
    this.router.navigate(['/items']);
  }

  goToStores(): void {
    this.router.navigate(['/stores']);
  }

  gotoUsers(): void {
    this.router.navigate(['/users']);
  }

  logout(): void {
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  gotoHome(): void {
    this.router.navigate(['/home']);
  }

  gotoCar(): void {
    this.router.navigate(['/car']);
  }

  goToPay(): void {
    this.router.navigate(['/car-to-pay']);
  }

  goToMyPurchases(): void {
    this.router.navigate(['/purchases']);
  }


}
