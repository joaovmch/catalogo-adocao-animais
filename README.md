# AdotaCat — Catálogo de Animais para Adoção

Trabalho de Análise e Desenvolvimento de Sistemas (UNISEP).
Aluno: João Vitor Michalski

## Sobre o projeto

Sistema de catálogo de animais disponíveis para adoção. Tem cadastro,
edição, exclusão e busca/filtro dos animais, página de detalhes e uma
lista de favoritos. Os dados ficam no Firebase Realtime Database.

## Tecnologias

- Angular 20 (standalone components, Signals, Reactive Forms)
- TypeScript
- Firebase Realtime Database (acesso via HttpClient/REST)
- Angular Router, com Lazy Loading em todas as rotas

## Como rodar

Antes de rodar, é preciso configurar o Firebase: crie um projeto no
[Firebase Console](https://console.firebase.google.com/), ative o
Realtime Database, importe o `animais.json` (raiz do projeto) e cole a
URL gerada em `src/app/services/animal/animal.ts` (constante `apiUrl`).

```bash
npm install
npm start
```

Acesse http://localhost:4200

## Link da aplicação online

_a publicar_

## Rotas

| Rota | Página |
|---|---|
| `/home` | Início |
| `/itens` | Listagem, busca e filtros |
| `/itens/novo` | Cadastro |
| `/itens/:id` | Detalhes |
| `/itens/:id/editar` | Edição |
| `/favoritos` | Favoritos |
| `/sobre` | Sobre |

## Releases

- **v1.0** — CRUD em memória, Reactive Forms, Pipe e Diretiva customizados
- **v2.0** (atual) — persistência migrada para o Firebase Realtime Database,
  tratamento de erros e lazy loading em todas as rotas
- **v3.0** — cadastro de usuários, login e Auth Guard (próxima etapa)