import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  carregando = signal(false);
  erro = signal<string | null>(null);

  formulario = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });

  get campo() {
    return this.formulario.controls;
  }

  entrar(): void {
    this.erro.set(null);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    const { email, senha } = this.formulario.getRawValue();

    this.auth.login(email, senha).subscribe({
      next: () => {
        this.carregando.set(false);
        this.router.navigate(['/itens']);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('E-mail ou senha inválidos.');
      },
    });
  }
}
