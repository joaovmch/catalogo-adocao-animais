import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario';

const CHAVE_TOKEN = 'adotacat_token';
const CHAVE_USUARIO = 'adotacat_usuario';

/**
 * Service de autenticação.
 *
 * Sessão controlada via localStorage (token + dados do usuário logado),
 * mesmo padrão usado no exemplo da disciplina (exvideos). Não há backend
 * de autenticação próprio: "logar" aqui significa buscar o usuário pelo
 * e-mail no Firebase e comparar a senha (texto puro) no cliente.
 *
 * O usuário logado também fica espelhado em um signal, para que o menu
 * (App) e outros componentes reajam imediatamente ao login/logout sem
 * precisar recarregar a página.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly usuarioService = inject(UsuarioService);

  private readonly usuarioLogado = signal<Usuario | null>(this.lerUsuarioDoStorage());

  /** Tenta autenticar com e-mail e senha. */
  login(email: string, senha: string): Observable<Usuario> {
    return this.usuarioService.buscarPorEmail(email).pipe(
      map((usuario) => {
        if (!usuario || usuario.senha !== senha) {
          throw new Error('E-mail ou senha inválidos.');
        }

        localStorage.setItem(CHAVE_TOKEN, usuario.token);
        localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
        this.usuarioLogado.set(usuario);

        return usuario;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
    this.usuarioLogado.set(null);
  }

  estaAutenticado(): boolean {
    return this.usuarioLogado() !== null;
  }

  obterUsuarioLogado() {
    return this.usuarioLogado;
  }

  /** Atalho para o id do usuário logado (ou null se não houver sessão). */
  idUsuarioLogado(): string | null {
    return this.usuarioLogado()?.id ?? null;
  }

  obterNomeUsuario(): string {
    return this.usuarioLogado()?.nome ?? '';
  }

  private lerUsuarioDoStorage(): Usuario | null {
    const dados = localStorage.getItem(CHAVE_USUARIO);
    return dados ? JSON.parse(dados) : null;
  }
}
