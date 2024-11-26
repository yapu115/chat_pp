export class Usuario {
  id: string;
  nombre: string;
  email: string;

  constructor(email: string, nombre: string) {
    this.id = '';
    this.nombre = nombre;
    this.email = email;
  }
}
