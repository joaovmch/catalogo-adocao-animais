import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'AdotaCat';

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly usuarioLogado = this.auth.obterUsuarioLogado();

  autenticado = computed(() => this.usuarioLogado() !== null);
  nomeUsuario = computed(() => this.usuarioLogado()?.nome ?? '');

  sair(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
