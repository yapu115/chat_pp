import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mensaje } from 'src/app/classes/mensaje';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-chat4-b',
  templateUrl: './chat4-b.component.html',
  styleUrls: ['./chat4-b.component.scss'],
})
export class Chat4BComponent {
  mensajes: Mensaje[] = [];
  subscription: Subscription | null = null;

  mensajeInput: string = '';

  @ViewChild('chatBody') chatBody!: ElementRef;

  constructor(private db: DatabaseService, protected auth: AuthService) {
    this.auth.antesDeSesion = false;
    this.auth.chatActual = '4b';
  }

  ngOnInit() {
    const observable = this.db.TraerChat('chat4b');

    this.subscription = observable.subscribe((resultado) => {
      this.mensajes = (resultado as any[]).map(
        (doc) => new Mensaje(doc.nombre, doc.contenido, doc.email, doc.fecha)
      );
      this.mensajes.sort((a, b) => a.fecha - b.fecha);
    });
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
      this.db.AgregarMensaje(menajeDelUsuario, 'chat4b');
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
