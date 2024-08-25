import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemsService } from 'src/app/services/items.service';
import { ItemList } from '../models/itemList.model';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.css']
})
export class ItemsFormComponent implements OnInit {
  itemForm: FormGroup;
  imageSrc: string | ArrayBuffer = '';
  fileName = 'imagen';


  constructor(private fb: FormBuilder, private itemsService: ItemsService) {
    this.itemForm = this.fb.group({
      itemId: [null], // Campo oculto para el ID
      code: [''],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      image: [null],
      stock: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.itemsService.currentItem$.subscribe(item => {
      if (item) {
        this.itemForm.patchValue(item); // Rellena el formulario con los datos del artículo
        this.imageSrc = 'data:image/jpeg;base64,' + item.image;
        this.fileName = 'Imagen Cargada'; // O el nombre original si lo tienes
      }
    });
  }

  onSubmit(): void {
    //imprimir en consola el valor del formulario
    console.log(this.itemForm.value);
    if (this.itemForm.valid) {
      const item = this.itemForm.value;
      if (item.itemId) {
        // Si el itemId está presente, hacemos una actualización (PUT)
        this.itemsService.updateItem(item).subscribe({
          next: (data) => {
            console.log(data);
            alert('Item actualizado con éxito');
          },
          error: (error) => {
            console.error('Hubo un error!', error);
          }
        });
      } else {
        // Si el itemId no está presente, hacemos una creación (POST)
        this.itemsService.createItem(item).subscribe({
          next: (data) => {
            console.log(data);
            alert('Item creado con éxito');
          },
          error: (error) => {
            console.error('Hubo un error!', error);
          }
        });
      }
    } else {
      console.error('Formulario no válido');
    }
  }


  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      // Obtener el resultado de la lectura y quitar el prefijo
      const result = reader.result as string;
      const base64String = result.split(',')[1]; // Extraer solo la parte base64

      // Actualizar el formulario con la cadena base64
      this.itemForm.patchValue({
        image: base64String
      });
              // Actualizar el nombre del archivo y la vista previa
              this.fileName = file.name;
              this.imageSrc = result;
    };
  }
}
