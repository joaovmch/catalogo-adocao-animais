import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CardAnimal } from '../../componentes/card-animal/card-animal';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal/animal';
import { FavoritosService } from '../../services/favoritos/favoritos';

@Component({
  selector: 'app-itens',
  imports: [CardAnimal, ReactiveFormsModule, RouterLink],
  templateUrl: './itens.html',
  styleUrl: './itens.css',
})
export class Itens {
  private readonly animalService = inject(AnimalService);
  private readonly favoritosService = inject(FavoritosService);
  private readonly fb = inject(FormBuilder);

  /** Lista completa (sem filtro), vinda direto do service. */
  animais = this.animalService.listar();

  /** Form reativo de busca e filtros — nada de @if/array.filter direto no template. */
  filtros = this.fb.group({
    busca: [''],
    especie: ['todas'],
    porte: ['todos'],
    status: ['todos'],
  });

  // Espelha o valor do form em um signal, pra poder combinar com o
  // signal de animais dentro de um computed() de forma reativa.
  private valoresFiltro = signal({
    busca: '',
    especie: 'todas',
    porte: 'todos',
    status: 'todos',
  });

  constructor() {
    this.filtros.valueChanges.subscribe((valores) => {
      this.valoresFiltro.set({
        busca: valores.busca ?? '',
        especie: valores.especie ?? 'todas',
        porte: valores.porte ?? 'todos',
        status: valores.status ?? 'todos',
      });
    });
  }

  /** Lista já filtrada pelos critérios de busca, recalculada automaticamente. */
  animaisFiltrados = computed(() => {
    const { busca, especie, porte, status } = this.valoresFiltro();
    const termo = busca.trim().toLowerCase();

    return this.animais().filter((animal) => {
      const combinaBusca = !termo || animal.nome.toLowerCase().includes(termo);
      const combinaEspecie = especie === 'todas' || animal.especie === especie;
      const combinaPorte = porte === 'todos' || animal.porte === porte;
      const combinaStatus = status === 'todos' || animal.statusAdocao === status;
      return combinaBusca && combinaEspecie && combinaPorte && combinaStatus;
    });
  });

  onMarcarInteresse(animal: Animal): void {
    this.favoritosService.alternarInteresse(animal);
  }

  jaTemInteresse(animalId: number): boolean {
    return this.favoritosService.estaNaLista(animalId);
  }

  onExcluir(animal: Animal): void {
    const confirmar = confirm(`Excluir "${animal.nome}" do catálogo? Essa ação não pode ser desfeita.`);
    if (!confirmar) {
      return;
    }
    this.animalService.remover(animal.id);
    // se o animal excluído estava nos favoritos, remove de lá também
    this.favoritosService.removerFavorito(animal.id);
  }

  limparFiltros(): void {
    this.filtros.reset({ busca: '', especie: 'todas', porte: 'todos', status: 'todos' });
  }
}
