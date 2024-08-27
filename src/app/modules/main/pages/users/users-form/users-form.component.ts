import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { users } from '../models/user.model';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.usersService.currentUser$.subscribe(user => {
      if (user) {
        this.userForm.patchValue(user);
      }
    });
    }
  

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: users = this.userForm.value;

      if (user.id) {
        // Actualizar usuario
        this.usersService.updateUser(user).subscribe({
          next: (data) => {
            console.log('Usuario actualizado:', data);
            alert('Usuario actualizado con éxito');
          },
          error: (error) => {
            console.error('Error actualizando usuario:', error);
            alert('Hubo un error al actualizar el usuario.');
          }
        });
      } else {
        // Crear nuevo usuario
        this.usersService.createUser(user).subscribe({
          next: (data) => {
            console.log('Usuario creado:', data);
            alert('Usuario creado con éxito');
          },
          error: (error) => {
            console.error('Error creando usuario:', error);
            alert('Hubo un error al crear el usuario.');
          }
        });
      }
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }

  onCancel(): void {
    // Lógica para cancelar y redirigir o limpiar el formulario
    this.userForm.reset();
  }
}
