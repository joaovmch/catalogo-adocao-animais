# AdotaCat — Catálogo de Animais para Adoção

Trabalho de Análise e Desenvolvimento de Sistemas (UNISEP).
Aluno: João Vitor Michalski

## Sobre o projeto

Sistema de catálogo de animais disponíveis para adoção. Tem cadastro,
edição, exclusão e busca/filtro dos animais, página de detalhes, lista de
favoritos e login com controle de acesso. Os dados ficam no Firebase
Realtime Database.

## Tecnologias

- Angular 20 (standalone components, Signals, Reactive Forms)
- TypeScript
- Firebase Realtime Database (acesso via HttpClient/REST)
- Angular Router, com Lazy Loading e Auth Guard nas rotas privadas

## Como rodar

Antes de rodar, é preciso configurar o Firebase: crie um projeto no
[Firebase Console](https://console.firebase.google.com/), ative o
Realtime Database e importe o `dados.json` (raiz do projeto) — ele já
contém os nós `animais` e `usuarios` juntos, então a importação na raiz
do banco cria os dois de uma vez. Depois cole a URL gerada em
`src/app/services/animal/animal.ts` e `src/app/services/usuario/usuario.ts`
(constante `apiUrl` de cada um).

O `dados.json` já vem com uma conta de teste em `usuarios`:
`admin@adotacat.com` / `admin123` (com o `token` já preenchido, no mesmo
formato gerado pelo cadastro).

```bash
npm install
npm start
```

Acesse http://localhost:4200

## Link da aplicação online

_a publicar_

## Rotas

| Rota | Página | Acesso |
|---|---|---|
| `/home` | Início | público |
| `/login` | Entrar | público |
| `/cadastro` | Criar conta | público |
| `/sobre` | Sobre | público |
| `/itens` | Listagem, busca e filtros | logado |
| `/itens/novo` | Cadastro de animal | logado |
| `/itens/:id` | Detalhes | logado |
| `/itens/:id/editar` | Edição de animal | logado |
| `/favoritos` | Favoritos | logado |
| `/usuarios` | Listagem de usuários | logado |
| `/usuarios/:id/editar` | Edição de usuário | logado |

## Releases

- **v1.0** — CRUD em memória, Reactive Forms, Pipe e Diretiva customizados
- **v2.0** — persistência migrada para o Firebase Realtime Database,
  tratamento de erros e lazy loading em todas as rotas
- **v3.0** (atual) — cadastro/login/CRUD de usuários, autenticação por
  sessão (localStorage), Auth Guard protegendo as rotas privadas
