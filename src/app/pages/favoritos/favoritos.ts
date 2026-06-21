import { Component, inject } from '@angular/core';
import { CardAnimal } from '../../componentes/card-animal/card-animal';
import { Animal } from '../../models/animal.model';
import { FavoritosService } from '../../services/favoritos/favoritos';

@Component({
  selector: 'app-favoritos',
  imports: [CardAnimal],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {

  private favoritosService = inject(FavoritosService);

  // signal vindo do service: a MESMA lista que o componente Itens alimentou.
  favoritos = this.favoritosService.obterFavoritos();

  onRemover(animal: Animal): void {
    this.favoritosService.removerFavorito(animal.id);
  }
}
