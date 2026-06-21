import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Animal } from '../../models/animal.model';

type AnimalFirebase = Omit<Animal, 'id'>;


@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://catalogo-adocao-animais-default-rtdb.firebaseio.com/animais';
  private readonly sufixo = '.json';

  private readonly animais = signal<Animal[]>([]);
  private readonly carregando = signal<boolean>(false);
  private readonly erro = signal<string | null>(null);

  /** Retorna o signal com a lista completa de animais (somente leitura pelos componentes). */
  listar() {
    return this.animais;
  }

  /** Indica se uma requisição ao Firebase está em andamento. */
  estaCarregando() {
    return this.carregando;
  }

  /** Última mensagem de erro de comunicação com o Firebase (ou null se tudo certo). */
  obterErro() {
    return this.erro;
  }

  /**
   * Busca a lista completa no Firebase e atualiza o signal local.
   * Deve ser chamado ao entrar na tela de listagem (ver Itens).
   */
  carregar(): void {
    this.carregando.set(true);
    this.erro.set(null);

    this.buscarTodos().subscribe({
      next: (lista) => {
        this.animais.set(lista);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os animais. Verifique sua conexão e tente novamente.');
        this.carregando.set(false);
      },
    });
  }

  /** GET .../animais.json — lista todos os registros. */
  private buscarTodos(): Observable<Animal[]> {
    return this.http.get<Record<string, AnimalFirebase> | null>(this.apiUrl + this.sufixo).pipe(
      map((resposta) => {
        if (!resposta) {
          return [];
        }
        return Object.entries(resposta).map(([id, dados]) => ({ id, ...dados }));
      }),
    );
  }

  /** GET .../animais/:id.json — busca um único registro pelo id (chave do Firebase). */
  obterPorId(id: string): Observable<Animal> {
    return this.http.get<AnimalFirebase | null>(`${this.apiUrl}/${id}${this.sufixo}`).pipe(
      map((dados) => {
        if (!dados) {
          throw new Error('Animal não encontrado.');
        }
        return { id, ...dados };
      }),
    );
  }

  /**
   * POST .../animais.json — cria um novo registro.
   * O Firebase responde com { name: "<chave gerada>" }, que se torna o id.
   */
  adicionar(dados: Omit<Animal, 'id'>): Observable<Animal> {
    return this.http.post<{ name: string }>(this.apiUrl + this.sufixo, dados).pipe(
      map((resposta) => {
        const novoAnimal: Animal = { id: resposta.name, ...dados };
        this.animais.update((lista) => [...lista, novoAnimal]);
        return novoAnimal;
      }),
    );
  }

  /** PUT .../animais/:id.json — substitui um registro existente. */
  atualizar(animalAtualizado: Animal): Observable<Animal> {
    const { id, ...dados } = animalAtualizado;
    return this.http.put<AnimalFirebase>(`${this.apiUrl}/${id}${this.sufixo}`, dados).pipe(
      map((resposta) => {
        const animal: Animal = { id, ...resposta };
        this.animais.update((lista) => lista.map((a) => (a.id === id ? animal : a)));
        return animal;
      }),
    );
  }

  /** DELETE .../animais/:id.json — remove um registro. */
  remover(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufixo}`).pipe(
      map(() => {
        this.animais.update((lista) => lista.filter((a) => a.id !== id));
      }),
    );
  }
}
