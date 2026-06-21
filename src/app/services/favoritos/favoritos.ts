import { Injectable, signal } from '@angular/core';
import { Animal } from '../../models/animal.model';

/**
 * Service responsável por manter a lista de animais "selecionados/favoritados".
 *
 * Por que um service e não @Input/@Output direto entre Itens e Favoritos?
 * Porque Itens e Favoritos são PÁGINAS (rotas) diferentes, ou seja, componentes
 * que não têm relação direta de pai/filho entre si. O Angular não permite passar
 * @Input()/@Output() entre componentes que não estão na mesma árvore de template.
 *
 * Então o fluxo completo do requisito fica assim:
 *  1) CardAnimal (filho) emite @Output() quando o usuário clica no botão
 *  2) Itens (pai do card) escuta esse evento no template com (marcarInteresse)
 *  3) Itens chama este service para adicionar/remover o item da lista
 *  4) Favoritos injeta o MESMO service e exibe a lista atualizada
 */
@Injectable({
  providedIn: 'root',
})
export class FavoritosService {

  // signal = estado reativo do Angular moderno. Qualquer componente que leia
  // este signal no template é atualizado automaticamente quando ele muda.
  private listaFavoritos = signal<Animal[]>([]);

  obterFavoritos() {
    return this.listaFavoritos;
  }

  estaNaLista(animalId: number): boolean {
    return this.listaFavoritos().some(a => a.id === animalId);
  }

  alternarInteresse(animal: Animal): void {
    if (this.estaNaLista(animal.id)) {
      this.removerFavorito(animal.id);
    } else {
      this.listaFavoritos.update(lista => [...lista, animal]);
    }
  }

  removerFavorito(animalId: number): void {
    this.listaFavoritos.update(lista => lista.filter(a => a.id !== animalId));
  }
}
