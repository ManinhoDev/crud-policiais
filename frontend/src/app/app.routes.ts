// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ListaComponent } from './pages/lista/lista.component';

export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'lista', component: ListaComponent },
  { path: '', redirectTo: '/lista', pathMatch: 'full' },
];
