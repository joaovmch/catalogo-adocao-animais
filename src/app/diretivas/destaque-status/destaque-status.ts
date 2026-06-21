import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { StatusAdocao } from '../../models/animal.model';

/**
 * Diretiva customizada da Release 1.
 *
 * Aplica uma borda colorida no elemento de acordo com o status de adoção
 * do animal, sem precisar repetir lógica de classe CSS em cada template.
 *
 * Uso: <article [appDestaqueStatus]="animal.statusAdocao">...</article>
 */
@Directive({
  selector: '[appDestaqueStatus]',
})
export class DestaqueStatusDirective implements OnChanges {
  @Input('appDestaqueStatus') status: StatusAdocao | undefined;

  private readonly cores: Record<StatusAdocao, string> = {
    Disponível: '#2e7d4f',
    'Em processo': '#c98a1c',
    Adotado: '#8a8a8a',
  };

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(): void {
    const cor = this.status ? this.cores[this.status] : '#c7d3cd';
    this.renderer.setStyle(this.el.nativeElement, 'border-left', `5px solid ${cor}`);
  }
}
