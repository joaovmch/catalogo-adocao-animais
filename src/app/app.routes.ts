import { Routes } from '@angular/router';

/**
 * Release 2 (v2.0): todas as rotas usam loadComponent() (lazy loading).
 * Cada componente só é baixado pelo navegador quando a rota é acessada,
 * em vez de tudo ir junto no bundle inicial.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'AdotaCat - Início',
  },
  {
    path: 'itens',
    loadComponent: () => import('./pages/itens/itens').then((m) => m.Itens),
    title: 'AdotaCat - Animais',
  },
  // Rotas estáticas (novo) precisam vir ANTES da rota com :id,
  // senão o Angular tentaria tratar "novo" como se fosse um id.
  {
    path: 'itens/novo',
    loadComponent: () => import('./pages/animal-form/animal-form').then((m) => m.AnimalForm),
    title: 'AdotaCat - Cadastrar animal',
  },
  {
    path: 'itens/:id/editar',
    loadComponent: () => import('./pages/animal-form/animal-form').then((m) => m.AnimalForm),
    title: 'AdotaCat - Editar animal',
  },
  {
    path: 'itens/:id',
    loadComponent: () => import('./pages/animal-detalhe/animal-detalhe').then((m) => m.AnimalDetalhe),
    title: 'AdotaCat - Detalhes',
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos').then((m) => m.Favoritos),
    title: 'AdotaCat - Favoritos',
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre').then((m) => m.Sobre),
    title: 'AdotaCat - Sobre',
  },
  { path: '**', redirectTo: 'home' },
];
