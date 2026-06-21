import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

/**
 * Release 2 (v2.0): todas as rotas usam loadComponent() (lazy loading).
 * Release 3 (v3.0): rotas internas (tudo que envolve dados do catálogo e
 * dos usuários) passam a exigir login, via authGuard. Home, Sobre, Login
 * e Cadastro continuam públicas.
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'AdotaCat - Início',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
    title: 'AdotaCat - Entrar',
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/usuario-cadastro/usuario-cadastro').then((m) => m.UsuarioCadastro),
    title: 'AdotaCat - Criar conta',
  },
  {
    path: 'itens',
    loadComponent: () => import('./pages/itens/itens').then((m) => m.Itens),
    title: 'AdotaCat - Animais',
    canActivate: [authGuard],
  },
  // Rotas estáticas (novo) precisam vir ANTES da rota com :id,
  // senão o Angular tentaria tratar "novo" como se fosse um id.
  {
    path: 'itens/novo',
    loadComponent: () => import('./pages/animal-form/animal-form').then((m) => m.AnimalForm),
    title: 'AdotaCat - Cadastrar animal',
    canActivate: [authGuard],
  },
  {
    path: 'itens/:id/editar',
    loadComponent: () => import('./pages/animal-form/animal-form').then((m) => m.AnimalForm),
    title: 'AdotaCat - Editar animal',
    canActivate: [authGuard],
  },
  {
    path: 'itens/:id',
    loadComponent: () => import('./pages/animal-detalhe/animal-detalhe').then((m) => m.AnimalDetalhe),
    title: 'AdotaCat - Detalhes',
    canActivate: [authGuard],
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos').then((m) => m.Favoritos),
    title: 'AdotaCat - Favoritos',
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios),
    title: 'AdotaCat - Usuários',
    canActivate: [authGuard],
  },
  {
    path: 'usuarios/:id/editar',
    loadComponent: () => import('./pages/usuario-form/usuario-form').then((m) => m.UsuarioForm),
    title: 'AdotaCat - Editar usuário',
    canActivate: [authGuard],
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/sobre/sobre').then((m) => m.Sobre),
    title: 'AdotaCat - Sobre',
  },
  { path: '**', redirectTo: 'home' },
];
