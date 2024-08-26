import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ItemsComponent } from './pages/items/items.component';
import { ItemsListComponent } from './pages/items/items-list/items-list.component';
import { ItemsFormComponent } from './pages/items/items-form/items-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { StoresComponent } from './pages/stores/stores.component';
import { StoresFormComponent } from './pages/stores/stores-form/stores-form.component';
import { StoresListComponent } from './pages/stores/stores-list/stores-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';




@NgModule({
  declarations: [
    HomeComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemsFormComponent,
    StoresComponent,
    StoresFormComponent,
    StoresListComponent,
    UsersComponent,
    UsersFormComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }
