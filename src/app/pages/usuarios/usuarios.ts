import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth/auth';
import { UsuarioService } from '../../services/usuario/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  private readonly usuarioService = inject(UsuarioService);
  private readonly auth = inject(AuthService);

  usuarios = this.usuarioService.listar();
  carregando = this.usuarioService.estaCarregando();
  erro = this.usuarioService.obterErro();

  ngOnInit(): void {
    this.usuarioService.carregar();
  }

  /** Evita que o usuário logado exclua a própria conta nesta listagem. */
  ehUsuarioLogado(usuario: Usuario): boolean {
    return this.auth.idUsuarioLogado() === usuario.id;
  }

  excluir(usuario: Usuario): void {
    const confirmar = confirm(`Excluir o usuário "${usuario.nome}"? Essa ação não pode ser desfeita.`);
    if (!confirmar) {
      return;
    }

    this.usuarioService.remover(usuario.id).subscribe({
      error: () => alert('Não foi possível excluir o usuário. Tente novamente.'),
    });
  }
}
