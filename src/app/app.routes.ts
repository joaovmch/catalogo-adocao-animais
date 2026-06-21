import { Routes } from '@angular/router';
import { AnimalDetalhe } from './pages/animal-detalhe/animal-detalhe';
import { AnimalForm } from './pages/animal-form/animal-form';
import { Favoritos } from './pages/favoritos/favoritos';
import { Home } from './pages/home/home';
import { Itens } from './pages/itens/itens';
import { Sobre } from './pages/sobre/sobre';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home, title: 'AdotaCat - Início' },
  { path: 'itens', component: Itens, title: 'AdotaCat - Animais' },
  // Rotas estáticas (novo) precisam vir ANTES da rota com :id,
  // senão o Angular tentaria tratar "novo" como se fosse um id.
  { path: 'itens/novo', component: AnimalForm, title: 'AdotaCat - Cadastrar animal' },
  { path: 'itens/:id/editar', component: AnimalForm, title: 'AdotaCat - Editar animal' },
  { path: 'itens/:id', component: AnimalDetalhe, title: 'AdotaCat - Detalhes' },
  { path: 'favoritos', component: Favoritos, title: 'AdotaCat - Favoritos' },
  { path: 'sobre', component: Sobre, title: 'AdotaCat - Sobre' },
  { path: '**', redirectTo: 'home' },
];
