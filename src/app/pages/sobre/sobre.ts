import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  imports: [],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css',
})
export class Sobre {
  aluno = 'João Vitor Michalski';
  curso = 'Análise e Desenvolvimento de Sistemas - UNISEP';
  tema = 'Catálogo de Animais para Adoção';
  tecnologias = [
    'Angular 20 (standalone components)',
    'TypeScript',
    'Angular Router',
    'Reactive Forms (cadastro, edição e filtros)',
    'Pipe customizado (especieIcone)',
    'Diretiva customizada (appDestaqueStatus)',
    'Services (Injectable) com CRUD em memória',
    'Signals (Angular)',
    'CSS3',
  ];
}
