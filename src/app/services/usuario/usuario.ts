import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

/** Formato como cada usuário chega "cru" do Firebase (sem o id, que é a própria chave). */
type UsuarioFirebase = Omit<Usuario, 'id'>;

/**
 * Service responsável pelo CRUD de usuários (Release 3).
 *
 * Mesmo padrão do AnimalService: HttpClient puro na API REST do Firebase
 * Realtime Database (qualquer caminho + ".json").
 */
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);

  // Mesma base do AnimalService, nó "usuarios".
  private readonly apiUrl = 'https://catalogo-adocao-animais-default-rtdb.firebaseio.com/usuarios';
  private readonly sufixo = '.json';

  private readonly usuarios = signal<Usuario[]>([]);
  private readonly carregando = signal<boolean>(false);
  private readonly erro = signal<string | null>(null);

  listar() {
    return this.usuarios;
  }

  estaCarregando() {
    return this.carregando;
  }

  obterErro() {
    return this.erro;
  }

  /** Busca a lista completa no Firebase e atualiza o signal local. */
  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);

    this.buscarTodos().subscribe({
      next: (lista) => {
        this.usuarios.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os usuários. Verifique sua conexão e tente novamente.');
        this.carregando.set(false);
      },
    });
  }

  /** GET .../usuarios.json — lista todos os registros. */
  private buscarTodos(): Observable<Usuario[]> {
    return this.http.get<Record<string, UsuarioFirebase> | null>(this.apiUrl + this.sufixo).pipe(
      map((resposta) => {
        if (!resposta) {
          return [];
        }
        return Object.entries(resposta).map(([id, dados]) => ({ id, ...dados }));
      }),
    );
  }

  /** GET .../usuarios/:id.json */
  obterPorId(id: string): Observable<Usuario> {
    return this.http.get<UsuarioFirebase | null>(`${this.apiUrl}/${id}${this.sufixo}`).pipe(
      map((dados) => {
        if (!dados) {
          throw new Error('Usuário não encontrado.');
        }
        return { id, ...dados };
      }),
    );
  }

  /** GET .../usuarios.json, filtrando por e-mail no cliente (usado no login e no cadastro). */
  buscarPorEmail(email: string): Observable<Usuario | undefined> {
    return this.buscarTodos().pipe(
      map((lista) => lista.find((usuario) => usuario.email.toLowerCase() === email.toLowerCase())),
    );
  }

  /**
   * POST .../usuarios.json — cria um novo registro.
   * O token é gerado aqui, uma única vez, e gravado junto com o usuário
   * (mesmo padrão do exvideos: o login não gera token, só lê o que já
   * está salvo no Firebase).
   */
  adicionar(dados: Omit<Usuario, 'id' | 'token'>): Observable<Usuario> {
    const dadosComToken: UsuarioFirebase = { ...dados, token: this.gerarToken() };

    return this.http.post<{ name: string }>(this.apiUrl + this.sufixo, dadosComToken).pipe(
      map((resposta) => {
        const novoUsuario: Usuario = { id: resposta.name, ...dadosComToken };
        this.usuarios.update((lista) => [...lista, novoUsuario]);
        return novoUsuario;
      }),
    );
  }

  /** PUT .../usuarios/:id.json — substitui um registro existente. */
  atualizar(usuarioAtualizado: Usuario): Observable<Usuario> {
    const { id, ...dados } = usuarioAtualizado;
    return this.http.put<UsuarioFirebase>(`${this.apiUrl}/${id}${this.sufixo}`, dados).pipe(
      map((resposta) => {
        const usuario: Usuario = { id, ...resposta };
        this.usuarios.update((lista) => lista.map((u) => (u.id === id ? usuario : u)));
        return usuario;
      }),
    );
  }

  /** DELETE .../usuarios/:id.json — remove um registro. */
  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufixo}`).pipe(
      map(() => {
        this.usuarios.update((lista) => lista.filter((u) => u.id !== id));
      }),
    );
  }

  /** Token simples gerado uma única vez no cadastro (não é um JWT real). */
  private gerarToken(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}
