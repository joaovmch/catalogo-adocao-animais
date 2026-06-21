import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario';

/**
 * Edição de usuário (não há cadastro aqui — o cadastro público fica em
 * /cadastro, ver UsuarioCadastro). Esta tela é só para alterar nome/e-mail/senha
 * de um usuário já existente, acessada a partir da listagem /usuarios.
 */
@Component({
  selector: 'app-usuario-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css',
})
export class UsuarioForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private idEdicao = '';
  private tokenAtual = '';

  carregando = signal(false);
  erro = signal<string | null>(null);

  formulario = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(4)]],
  });

  get campo() {
    return this.formulario.controls;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.router.navigate(['/usuarios']);
      return;
    }

    this.idEdicao = idParam;
    this.carregando.set(true);

    this.usuarioService.obterPorId(idParam).subscribe({
      next: (usuario) => {
        this.tokenAtual = usuario.token;
        this.formulario.patchValue(usuario);
        this.carregando.set(false);
      },
      error: () => {
        this.router.navigate(['/usuarios']);
      },
    });
  }

  salvar(): void {
    this.erro.set(null);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const dados = this.formulario.getRawValue() as { nome: string; email: string; senha: string };
    this.carregando.set(true);

    this.usuarioService.atualizar({ id: this.idEdicao, token: this.tokenAtual, ...dados }).subscribe({
      next: () => {
        this.router.navigate(['/usuarios']);
      },
      error: () => {
        this.carregando.set(false);
        this.erro.set('Não foi possível salvar as alterações. Tente novamente.');
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
