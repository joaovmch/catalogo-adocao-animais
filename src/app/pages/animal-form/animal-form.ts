import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal/animal';

@Component({
  selector: 'app-animal-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './animal-form.html',
  styleUrl: './animal-form.css',
})
export class AnimalForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly animalService = inject(AnimalService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private idEdicao: string | null = null;

  /** Controla se o usuário já tentou enviar o formulário (para exibir erros). */
  enviado = signal(false);

  /** true enquanto busca o registro (modo edição) ou salva no Firebase. */
  carregando = signal(false);

  /** Mensagem de erro de comunicação com o Firebase, se houver. */
  erro = signal<string | null>(null);

  modoEdicao = computed(() => this.idEdicao !== null);

  formulario = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    especie: ['Cachorro' as Animal['especie'], Validators.required],
    idade: ['', Validators.required],
    porte: ['Pequeno' as Animal['porte'], Validators.required],
    statusAdocao: ['Disponível' as Animal['statusAdocao'], Validators.required],
    descricao: ['', [Validators.required, Validators.minLength(10)]],
    foto: [''],
  });

  get campo() {
    return this.formulario.controls;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      return;
    }

    this.idEdicao = idParam;
    this.carregando.set(true);

    this.animalService.obterPorId(idParam).subscribe({
      next: (animal) => {
        this.formulario.patchValue(animal);
        this.carregando.set(false);
      },
      error: () => {
        // id inválido/inexistente no Firebase: volta para a listagem
        // em vez de mostrar um form vazio.
        this.router.navigate(['/itens']);
      },
    });
  }

  salvar(): void {
    this.enviado.set(true);
    this.erro.set(null);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue() as Omit<Animal, 'id'>;
    this.carregando.set(true);

    const operacao = this.idEdicao !== null
      ? this.animalService.atualizar({ id: this.idEdicao, ...dados })
      : this.animalService.adicionar(dados);

    operacao.subscribe({
      next: () => {
        this.router.navigate(['/itens']);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível salvar o animal. Verifique sua conexão e tente novamente.');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/itens']);
  }
}
