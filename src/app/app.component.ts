import { Component, inject } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private router = inject(Router);

  constructor(private platform: Platform, protected auth: AuthService) {}

  ngOnInit(): void {
    this.platform.ready().then(() => {
      SplashScreen.hide();
    });
  }

  Volver() {
    window.history.back();
    this.auth.antesDeSesion = true;
    this.auth.chatActual = '';
  }

  CerrarSesion() {
    this.auth.CerrarSesion();
    this.router.navigate(['/iniciar-sesion']);
  }
}
