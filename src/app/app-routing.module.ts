import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/modules/auth/pages/login/login.component';
import { CreateAccountComponent } from './modules/auth/pages/create-account/create-account.component';
import { HomeComponent } from './modules/main/pages/home/home.component';
import { ItemsComponent } from './modules/main/pages/items/items.component';
import { StoresComponent } from './modules/main/pages/stores/stores.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemsComponent},
  { path: 'stores', component: StoresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
