import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mensaje } from 'src/app/classes/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-chat4-a',
  templateUrl: './chat4-a.component.html',
  styleUrls: ['./chat4-a.component.scss'],
})
export class Chat4AComponent {
  mensajes: Mensaje[] = [];
  subscription: Subscription | null = null;

  mensajeInput: string = '';

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private db: DatabaseService, protected auth: AuthService) {
    this.auth.antesDeSesion = false;
    this.auth.chatActual = '4a';
  }

  ngOnInit() {
    const observable = this.db.TraerChat('chat4a');

    this.subscription = observable.subscribe((resultado) => {
      this.mensajes = (resultado as any[]).map(
        (doc) => new Mensaje(doc.nombre, doc.contenido, doc.email, doc.fecha)
      );
      this.mensajes.sort((a, b) => a.fecha - b.fecha);
    });
    this.HacerScroll();
  }

  EnviarMensaje() {
    if (this.mensajeInput !== '') {
      let fechaActual = new Date();
      let menajeDelUsuario = new Mensaje(
        this.auth.usuario.nombre,
        this.mensajeInput,
        this.auth.usuario.email,
        fechaActual
      );
      this.db.AgregarMensaje(menajeDelUsuario, 'chat4a');
      this.mensajeInput = '';
      setTimeout(() => {
        this.HacerScroll();
      }, 100);
    }
  }

  HacerScroll(): void {
    try {
      this.chatBody.nativeElement.scrollTop =
        this.chatBody.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error al hacer scroll:', err);
    }
  }
}
