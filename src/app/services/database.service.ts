import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Mensaje } from '../classes/mensaje';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  TraerUsuario() {
    const colUsuarios = this.firestore.collection('usuarios');

    // ACA ESTÁ LA CLAVE PARA HACER EL CHAT
    const observable = colUsuarios.valueChanges();
    return observable;
  }

  // chat
  TraerChat(chat: string) {
    const colChat = this.firestore.collection(chat);

    const observable = colChat.valueChanges();
    return observable;
  }

  AgregarMensaje(mensaje: Mensaje, chat: string) {
    const colChat = this.firestore.collection(chat);
    colChat.add({ ...mensaje });
  }
}
