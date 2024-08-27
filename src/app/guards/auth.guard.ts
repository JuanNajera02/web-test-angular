import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const id = localStorage.getItem('id');
    if (id) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
