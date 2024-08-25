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



@NgModule({
  declarations: [
    HomeComponent,
    ItemsComponent,
    ItemsListComponent,
    ItemsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  exports: [
    HomeComponent
  ]
})
export class MainModule { }
