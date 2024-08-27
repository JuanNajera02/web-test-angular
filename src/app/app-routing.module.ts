import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/modules/auth/pages/login/login.component';
import { CreateAccountComponent } from './modules/auth/pages/create-account/create-account.component';
import { HomeComponent } from './modules/main/pages/home/home.component';
import { ItemsComponent } from './modules/main/pages/items/items.component';
import { StoresComponent } from './modules/main/pages/stores/stores.component';
import { UsersComponent } from './modules/main/pages/users/users.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { CarComponent } from './modules/main/pages/car/car.component';
import { StoresWithItemsComponent } from './modules/main/pages/car/stores-with-items/stores-with-items.component';
import { CarToPayComponent } from './modules/main/pages/car-to-pay/car-to-pay.component';
import { PurchasesComponent } from './modules/main/pages/purchases/purchases.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'stores', component: StoresComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'car', component: CarComponent, canActivate: [AuthGuard] },
  {path: 'stores-with-items/:id', component: StoresWithItemsComponent, canActivate: [AuthGuard]},
  {path: 'car-to-pay', component: CarToPayComponent, canActivate: [AuthGuard]},
  {path: 'purchases', component: PurchasesComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
