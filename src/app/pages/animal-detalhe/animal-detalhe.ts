import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DestaqueStatusDirective } from '../../diretivas/destaque-status/destaque-status';
import { EspecieIconePipe } from '../../pipes/especie-icone/especie-icone';
import { AnimalService } from '../../services/animal/animal';

@Component({
  selector: 'app-animal-detalhe',
  imports: [RouterLink, EspecieIconePipe, DestaqueStatusDirective],
  templateUrl: './animal-detalhe.html',
  styleUrl: './animal-detalhe.css',
})
export class AnimalDetalhe {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly animalService = inject(AnimalService);

  private readonly id = Number(this.route.snapshot.paramMap.get('id'));

  // computed: recalcula automaticamente se o animal for editado/removido
  // em outra tela enquanto esta ficar montada (estado vem do mesmo service).
  animal = computed(() => this.animalService.obterPorId(this.id));

  excluir(): void {
    const animalAtual = this.animal();
    if (!animalAtual) {
      return;
    }

    const confirmar = confirm(`Excluir "${animalAtual.nome}" do catálogo? Essa ação não pode ser desfeita.`);
    if (!confirmar) {
      return;
    }

    this.animalService.remover(animalAtual.id);
    this.router.navigate(['/itens']);
  }
}
