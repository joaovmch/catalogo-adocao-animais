import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario';

@Component({
  selector: 'app-usuario-cadastro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-cadastro.html',
  styleUrl: './usuario-cadastro.css',
})
export class UsuarioCadastro {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly router = inject(Router);

  enviado = signal(false);
  carregando = signal(false);
  erro = signal<string | null>(null);

  formulario = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
  });

  get campo() {
    return this.formulario.controls;
  }

  cadastrar(): void {
    this.enviado.set(true);
    this.erro.set(null);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue();
    this.carregando.set(true);

    // Garante que não existe outro usuário com o mesmo e-mail antes de criar.
    this.usuarioService.buscarPorEmail(dados.email).subscribe({
      next: (existente) => {
        if (existente) {
          this.carregando.set(false);
          this.erro.set('Já existe uma conta com este e-mail.');
          return;
        }

        this.usuarioService.adicionar(dados).subscribe({
          next: () => {
            this.carregando.set(false);
            this.router.navigate(['/login']);
          },
          error: () => {
            this.carregando.set(false);
            this.erro.set('Não foi possível concluir o cadastro. Tente novamente.');
          },
        });
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível concluir o cadastro. Tente novamente.');
      },
    });
  }
}
