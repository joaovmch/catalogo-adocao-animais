import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DestaqueStatusDirective } from '../../diretivas/destaque-status/destaque-status';
import { Animal } from '../../models/animal.model';
import { EspecieIconePipe } from '../../pipes/especie-icone/especie-icone';

@Component({
  selector: 'app-card-animal',
  imports: [RouterLink, EspecieIconePipe, DestaqueStatusDirective],
  templateUrl: './card-animal.html',
  styleUrl: './card-animal.css',
})
export class CardAnimal {

 
  @Input({ required: true }) animal!: Animal;

  @Input() contexto: 'listagem' | 'favoritos' = 'listagem';

  @Input() jaTemInteresse = false;
  @Output() marcarInteresse = new EventEmitter<Animal>();
  @Output() removerDaLista = new EventEmitter<Animal>();
  @Output() excluirItem = new EventEmitter<Animal>();

  onBotaoPrincipalClick(): void {
    this.marcarInteresse.emit(this.animal);
  }

  onRemoverClick(): void {
    this.removerDaLista.emit(this.animal);
  }

  onExcluirClick(): void {
    this.excluirItem.emit(this.animal);
  }

  get rotuloBotaoPrincipal(): string {
    return this.jaTemInteresse ? 'Remover Interesse' : 'Marcar Interesse';
  }

  get statusClasse(): string {
    switch (this.animal.statusAdocao) {
      case 'Disponível': return 'status-disponivel';
      case 'Em processo': return 'status-processo';
      case 'Adotado': return 'status-adotado';
      default: return '';
    }
  }
}
