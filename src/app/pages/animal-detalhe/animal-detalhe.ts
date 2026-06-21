import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DestaqueStatusDirective } from '../../diretivas/destaque-status/destaque-status';
import { Animal } from '../../models/animal.model';
import { EspecieIconePipe } from '../../pipes/especie-icone/especie-icone';
import { AnimalService } from '../../services/animal/animal';

@Component({
  selector: 'app-animal-detalhe',
  imports: [RouterLink, EspecieIconePipe, DestaqueStatusDirective],
  templateUrl: './animal-detalhe.html',
  styleUrl: './animal-detalhe.css',
})
export class AnimalDetalhe implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly animalService = inject(AnimalService);

  private readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  /** Animal carregado do Firebase, ou undefined enquanto carrega/se não existir. */
  animal = signal<Animal | undefined>(undefined);
  carregando = signal(true);

  ngOnInit(): void {
    this.animalService.obterPorId(this.id).subscribe({
      next: (animal) => {
        this.animal.set(animal);
        this.carregando.set(false);
      },
      error: () => {
        this.animal.set(undefined);
        this.carregando.set(false);
      },
    });
  }

  excluir(): void {
    const animalAtual = this.animal();
    if (!animalAtual) {
      return;
    }

    const confirmar = confirm(`Excluir "${animalAtual.nome}" do catálogo? Essa ação não pode ser desfeita.`);
    if (!confirmar) {
      return;
    }

    this.animalService.remover(animalAtual.id).subscribe({
      next: () => {
        this.router.navigate(['/itens']);
      },
      error: () => {
        alert('Não foi possível excluir o animal. Tente novamente.');
      },
    });
  }
}
