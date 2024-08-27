import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StoresService } from 'src/app/services/stores.service';
import { Store } from '../models/store.model';
import { ItemList } from '../../items/models/itemList.model';
import { ItemStoreRelation } from '../models/items.store.model';

@Component({
  selector: 'app-stores-form',
  templateUrl: './stores-form.component.html',
  styleUrls: ['./stores-form.component.css']
})
export class StoresFormComponent implements OnInit {
  storeForm: FormGroup;
  items: ItemList[] = [];
  itemsRelation: ItemStoreRelation[] = [];
  storeId: any = 6;

  constructor(private fb: FormBuilder, private storeService: StoresService) {
    this.storeForm = this.fb.group({
      storeId: [null],
      branch: ['', Validators.required],
      address: ['', Validators.required],
      items: this.fb.array([])  // Array para los ítems
    });
  }

  ngOnInit(): void {
    // Obtener todos los ítems
    this.storeService.getItems().subscribe(items => {
      this.items = items.map((item: ItemList) => ({
        ...item,
        image: item.image ? `data:image/jpeg;base64,${item.image}` : null
      }));

      // Después de obtener los ítems, obtener la tienda actual y sus ítems relacionados
      this.storeService.currentStore$.subscribe(store => {
        if (store) {
          this.storeForm.patchValue(store);

          // Obtener los ítems relacionados con la tienda
          this.storeService.getItemsFromStoreID(store.storeId).subscribe(itemsRelation => {
            this.itemsRelation = itemsRelation;
            this.populateItemsFormArray();
          });
        }
      });
    });
  }

  populateItemsFormArray(): void {
    const itemsFormArray = this.storeForm.get('items') as FormArray;

    // Limpiar cualquier ítem existente
    while (itemsFormArray.length) {
      itemsFormArray.removeAt(0);
    }

    // Rellenar el FormArray con los ítems y su estado de selección
    this.items.forEach(item => {
      const selected = this.isSelected(item.itemId);
      itemsFormArray.push(this.fb.group({
        itemId: [item.itemId],
        selected: [selected]
      }));
    });
  }

  isSelected(itemId: number): boolean {
    return this.itemsRelation.some(item => item.itemId === itemId);
  }

  toggleItem(itemId: number): void {
    const itemsArray = this.storeForm.get('items') as FormArray;
    const itemGroup = itemsArray.controls.find(control => control.get('itemId')?.value === itemId);

    if (itemGroup) {
      const selectedControl = itemGroup.get('selected');
      selectedControl?.setValue(!selectedControl?.value);
    }
  }

  onSubmit(): void {
    if (this.storeForm.valid) {
      const store: Store = this.storeForm.value;
      const selectedItems = this.storeForm.value.items
        .filter((item: { selected: boolean }) => item.selected)
        .map((item: { itemId: number }) => item.itemId);

      console.log('Selected items:', selectedItems);

      if (store.storeId) {
        this.storeService.updateStore(store).subscribe({
          next: (data) => {
            this.storeService.updateItemsToStore(data.storeId, selectedItems).subscribe({
              next: (data) => {
                console.log('Items updated:', data);
                alert('Tienda actualizada correctamente');
              },
              error: (error) => {
                alert('Error al actualizar los ítems de la tienda');
              }
            });
          },
          error: (error) => {
            console.error('Error updating store:', error);
          }
        });
      } else {
        this.storeService.createStore(store).subscribe({
          next: (data) => {
            this.storeService.addItemsToStore(data.storeId, selectedItems).subscribe({
              next: (data) => {
                console.log(data);
              },
              error: (error) => {
                console.error('Error adding items to store:', error);
              }
            });
              alert('Tienda creada correctamente');
          },
          error: (error) => {
            alert('Error al crear la tienda');
          }
        });
      }
    } else {
      alert('Por favor, rellena todos los campos');
    }
  }


  onCancel(): void {
    this.storeForm.reset();
  }




}

