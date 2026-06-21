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

  private idEdicao: number | null = null;

  /** Controla se o usuário já tentou enviar o formulário (para exibir erros). */
  enviado = signal(false);

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

    const animalExistente = this.animalService.obterPorId(Number(idParam));
    if (!animalExistente) {
      // id inválido na URL: volta para a listagem em vez de mostrar um form vazio.
      this.router.navigate(['/itens']);
      return;
    }

    this.idEdicao = animalExistente.id;
    this.formulario.patchValue(animalExistente);
  }

  salvar(): void {
    this.enviado.set(true);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue() as Omit<Animal, 'id'>;

    if (this.idEdicao !== null) {
      this.animalService.atualizar({ id: this.idEdicao, ...dados });
    } else {
      this.animalService.adicionar(dados);
    }

    this.router.navigate(['/itens']);
  }

  cancelar(): void {
    this.router.navigate(['/itens']);
  }
}
