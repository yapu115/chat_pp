import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { Chat4AComponent } from './components/chat4-a/chat4-a.component';
import { Chat4BComponent } from './components/chat4-b/chat4-b.component';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'chat4a',
    component: Chat4AComponent,
  },
  {
    path: 'chat4b',
    component: Chat4BComponent,
  },
  {
    path: '',
    redirectTo: 'iniciar-sesion',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
