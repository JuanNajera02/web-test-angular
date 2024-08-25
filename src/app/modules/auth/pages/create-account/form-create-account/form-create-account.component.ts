import { Component } from '@angular/core';
import { Client } from '../models/Client';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-create-account',
  templateUrl: './form-create-account.component.html',
  styleUrls: ['./form-create-account.component.css']
})
export class FormCreateAccountComponent {

  constructor(private router: Router, private auth: AuthService) {}

  client: Client = {
    name: '',
    lastname: '',
    address: '',
    email: '',
    password: '',
    passwordVerification: ''
  };

  handleErrors(Client: Client): string {
    let messageError = '';
    if (Client.name === '') messageError += 'El nombre no puede estar vacío\n';
    if (Client.lastname === '') messageError += 'El apellido no puede estar vacío\n';
    if (Client.address === '') messageError += 'La dirección no puede estar vacía\n';
    if (Client.email === '') messageError += 'El email no puede estar vacío\n';
    if (Client.password === '') messageError += 'La contraseña no puede estar vacía\n';
    if (Client.passwordVerification === '') messageError += 'La verificación de contraseña no puede estar vacía\n';
    if (Client.password !== Client.passwordVerification) messageError += 'Las contraseñas no coinciden\n';
    return messageError;
  }

  regresar(): void {
    this.router.navigate(['/login']);
  }

  createAccount(): void {
    let messageError = this.handleErrors(this.client);
    if (messageError.length === 0) {
      this.auth.createAccount(this.client).subscribe({
        next: (data) => {
          console.log(data);
          alert('Usuario registrado con éxito');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Hubo un error!', error);
        }
      });
    } else {
      alert(messageError);
    }
  }

}
