import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    protected servicioUsuario: AuthService,
    protected router: Router
  ) {}

  chat4a() {
    this.router.navigate(['/chat4a']);
  }

  chat4b() {
    this.router.navigate(['/chat4b']);
  }
}
