import { Pipe, PipeTransform } from '@angular/core';
import { Especie } from '../../models/animal.model';

/**
 * Pipe customizado da Release 1.
 *
 * Transforma a espécie do animal (texto) em um ícone (emoji) para
 * deixar os cards e a página de detalhes mais visuais, sem precisar
 * de nenhuma imagem extra. É um pipe puro: só depende do valor de entrada.
 *
 * Uso no template: {{ animal.especie | especieIcone }}
 */
@Pipe({
  name: 'especieIcone',
})
export class EspecieIconePipe implements PipeTransform {
  private readonly icones: Record<Especie, string> = {
    Cachorro: '🐶',
    Gato: '🐱',
    Coelho: '🐰',
  };

  transform(especie: Especie): string {
    return this.icones[especie] ?? '🐾';
  }
}
