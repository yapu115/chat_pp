export class Mensaje {
  nombre: string;
  email: string;
  contenido: string;
  fecha: any;

  constructor(nombre: string, contenido: string, email: string, fecha: any) {
    this.nombre = nombre;
    this.contenido = contenido;
    this.fecha = fecha;
    this.email = email;
  }

  verificarUsuario(emailUsuario: string) {
    return this.email === emailUsuario;
  }

  obtenerFecha() {
    return this.fecha.toDate().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
