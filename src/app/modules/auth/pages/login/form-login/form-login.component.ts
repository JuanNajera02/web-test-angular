import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { creds } from '../models/creds';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  constructor(private router: Router, private auth: AuthService) {}

  creds: creds = {
    email: '',
    password: ''
  };

  handleErrors(creds: creds): string {
    let messageError = '';
    if (creds.email === '') messageError += 'El email no puede estar vacío\n';
    if (creds.password === '') messageError += 'La contraseña no puede estar vacía\n';
    return messageError;
  }

  login(): void {
    console.log(this.creds);
    let messageError = this.handleErrors(this.creds);
    if (messageError.length === 0) {
      this.auth.login(this.creds).subscribe({
        next: (data) => {
          console.log(data);
          alert('Usuario logueado con éxito');
          localStorage.setItem('id', data.id);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Hubo un error!', error);
          alert('Credenciales incorrectas');
        }
      });
    } else {
      alert(messageError);
    }




  }
}


