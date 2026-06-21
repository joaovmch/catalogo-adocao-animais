# AdotaCat — Catálogo de Animais para Adoção

Trabalho acadêmico — Análise e Desenvolvimento de Sistemas — UNISEP
Aluno: João Vitor Michalski

## Status do projeto

| Release | Tag | Conteúdo | Status |
|---|---|---|---|
| Release 1 | `v1.0` | CRUD completo em memória, Reactive Forms, Pipe e Diretiva customizados, busca/filtros | ✅ esta versão |
| Release 2 | `v2.0` | Migração da persistência para o Firebase Realtime Database, tratamento de erros, lazy loading | 🔜 próxima etapa |
| Release 3 | `v3.0` | Cadastro/login de usuários, autenticação, Auth Guard, proteção de rotas | 🔜 próxima etapa |

## Tecnologias usadas (e onde aparecem)

- **Angular 20+** → `package.json` (`@angular/core ^20.3.0`), componentes standalone,
  Signals e a sintaxe de controle de fluxo `@if` / `@for` nos templates.
- **TypeScript** → todo o projeto.
- **Angular Router** → `app.routes.ts`, `routerLink`, `routerLinkActive`, rotas com parâmetro (`/itens/:id`).
- **Reactive Forms** → `pages/animal-form` (cadastro/edição com `FormBuilder` + `Validators`)
  e `pages/itens` (formulário de busca e filtros).
- **Pipe customizado** → `pipes/especie-icone` (`especieIcone`), transforma a espécie em emoji.
- **Diretiva customizada** → `diretivas/destaque-status` (`appDestaqueStatus`), aplica uma
  borda colorida de acordo com o status de adoção.
- **Services** → `services/animal` (CRUD da entidade principal) e
  `services/favoritos` (estado compartilhado entre rotas via `signal`).
- **Components** → componentes standalone em `src/app/pages` e `src/app/componentes`.

## Como rodar

```bash
npm install
npm start
```

Depois acesse http://localhost:4200

## Link da aplicação online

_A ser publicado (GitHub Pages / Vercel / Firebase Hosting) — atualizar este link
quando a Release 2 ou 3 for publicada._

## Rotas

| Rota | Página |
|---|---|
| `/home` | Home |
| `/itens` | Listagem (com busca e filtros) |
| `/itens/novo` | Cadastro de animal |
| `/itens/:id` | Detalhes do animal |
| `/itens/:id/editar` | Edição de animal |
| `/favoritos` | Favoritos |
| `/sobre` | Sobre |

## Estrutura

```
src/app/
├── app.routes.ts                     -> configuração das rotas (CRUD + páginas fixas)
├── app.ts/html/css                   -> shell + menu de navegação
├── models/
│   └── animal.model.ts               -> interface Animal e tipos (Especie, Porte, StatusAdocao)
├── services/
│   ├── animal/animal.ts              -> CRUD da entidade principal (listar/adicionar/atualizar/remover)
│   └── favoritos/favoritos.ts        -> estado compartilhado entre as rotas Itens e Favoritos
├── pipes/
│   └── especie-icone/especie-icone.ts        -> Pipe customizado (espécie -> emoji)
├── diretivas/
│   └── destaque-status/destaque-status.ts    -> Diretiva customizada (borda por status)
├── componentes/
│   └── card-animal/                  -> componente filho reutilizável (@Input / @Output)
└── pages/
    ├── home/
    ├── itens/                        -> listagem + busca/filtros (Reactive Forms)
    ├── animal-form/                  -> cadastro e edição (Reactive Forms)
    ├── animal-detalhe/                -> página de detalhes
    ├── favoritos/
    └── sobre/
```

## Funcionalidades implementadas na Release 1 (v1.0)

- [x] Navegação por rotas (Home, Listagem, Cadastro, Detalhes, Edição, Favoritos, Sobre)
- [x] Menu com `routerLink` e destaque visual da rota ativa (`routerLinkActive`)
- [x] CRUD completo do animal: cadastrar, listar, editar, excluir, ver detalhes
- [x] `AnimalService` com estado reativo (`signal`) — fonte única da lista de animais
- [x] Reactive Forms no cadastro/edição (validações: obrigatório, tamanho mínimo)
- [x] Reactive Forms na busca e filtros (nome, espécie, porte, status)
- [x] Pipe customizado `especieIcone`
- [x] Diretiva customizada `appDestaqueStatus`
- [x] Componente filho reutilizável `CardAnimal` com `@Input()` e `@Output()`
- [x] Compartilhamento de estado entre rotas (Itens ⇄ Favoritos) via service com `signal`
- [x] Mensagens "Nenhum item encontrado/selecionado" e contadores ("Total de itens: X")
- [x] Exclusão sincronizada: remover um animal do catálogo também o remove dos favoritos

## O que ainda NÃO está nesta versão (fica para as próximas releases)

- Persistência real (Firebase Realtime Database) — Release 2
- Cadastro de usuários, login, autenticação e Auth Guard — Release 3
- Lazy loading das funcionalidades — Release 2
- Upload de imagem (hoje a foto é uma URL/caminho digitado manualmente, com placeholder padrão)
