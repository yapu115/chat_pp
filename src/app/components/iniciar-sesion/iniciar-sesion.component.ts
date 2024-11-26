import { Component, inject, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
})
export class IniciarSesionComponent {
  private router = inject(Router);
  formInicioSesion: FormGroup;

  // datos del usuario
  authSubscription?: Unsubscribe;

  // validaciones
  intentosInicioSesion: number;

  mailError: boolean = false;
  contrasenaError: boolean = false;
  usuarioNoEncontrado: boolean = false;

  mensajeMail: string = '';
  mensajeContrasena: string = '';
  mensajeUsuario: string = '';

  // Constructor
  constructor(private servicioUsuario: AuthService) {
    this.formInicioSesion = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required]),
    });
    this.intentosInicioSesion = 0;
    this.servicioUsuario.CerrarSesion();
  }

  IniciarSesion() {
    this.mailError = false;
    this.contrasenaError = false;
    this.usuarioNoEncontrado = false;
    if (this.ValidarCampos()) {
      this.servicioUsuario
        .IniciarSesion(this.formInicioSesion.value)
        .then((response) => {
          this.formInicioSesion.get('email')?.setValue('');
          this.formInicioSesion.get('contrasena')?.setValue('');
          this.servicioUsuario.antesDeSesion = true;
          this.router.navigate(['/home']);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/missing-email':
              this.mailError = true;
              this.mensajeMail = 'Correo incompleto';
              break;
            case 'auth/invalid-email':
              this.mailError = true;
              this.mensajeMail = 'Correo inválido';
              break;
            case 'auth/missing-password':
              this.contrasenaError = true;
              this.mensajeContrasena = 'Contraseña incompleta';
              break;
            case 'auth/wrong-password':
              this.contrasenaError = true;
              this.mensajeContrasena = 'Contraseña Incorrecta';
              break;
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
              this.mensajeUsuario = 'Usuario no encontrado';
              this.usuarioNoEncontrado = true;
              if (this.intentosInicioSesion > 2) {
                this.formInicioSesion.patchValue({
                  email: '',
                  contraseña: '',
                });
                this.mensajeUsuario = 'Ingrese los datos nuevamente';
              }
              this.intentosInicioSesion++;
              break;
          }
          console.log('Este es el ERROR: ', error);
        });
    }
  }

  ValidarCampos() {
    let camposValidados = true;

    const controlMail = this.formInicioSesion.controls['email'];
    const controlContrasena = this.formInicioSesion.controls['contrasena'];

    if (controlMail.errors !== null) {
      camposValidados = false;
      this.mailError = true;
      if (controlMail.errors!['required']) {
        this.mensajeMail = 'Ingrese su Correo';
      } else if (controlMail.errors!['email']) {
        this.mensajeMail = 'Ingrese un Correo válido';
      }
    }

    if (controlContrasena.errors !== null) {
      camposValidados = false;
      this.contrasenaError = true;
      if (controlContrasena.errors!['required']) {
        this.mensajeContrasena = 'Ingrese su contraseña';
      }
    }

    return camposValidados;
  }

  IniciarAlejandro() {
    this.mailError = false;
    this.contrasenaError = false;
    this.usuarioNoEncontrado = false;
    this.formInicioSesion.patchValue({
      email: 'alejandroluna@gmail.com',
      contrasena: 'canonEvent12',
    });
  }
  IniciarBerenice() {
    this.mailError = false;
    this.contrasenaError = false;
    this.usuarioNoEncontrado = false;
    this.formInicioSesion.patchValue({
      email: 'beruoddi20@gmail.com',
      contrasena: 'BananaFish42',
    });
  }
}
