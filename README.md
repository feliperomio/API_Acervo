# API Acervo

## O que o projeto faz

- registra e autentica usuários com JWT
- protege rotas com middleware de autenticação e autorização por perfil
- gerencia usuários, sessões e posts
- valida requisições com Joi antes de chegar nas regras de negócio
- centraliza o tratamento de erros em um middleware global
- gera documentação interativa em `/api-docs`

## Estrutura de pastas

```text
.
|-- src/
|   |-- config/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- validators/
|   |-- server.js
|-- uploads/
|-- node_modules/
|-- .env
|-- package.json
|-- package-lock.json
`-- README.md
```

## Por que cada pasta existe

### `src/`
Guarda o código-fonte principal da API. Tudo que define o comportamento da aplicação fica aqui, separado por responsabilidade para evitar que regras de rota, negócio, validação e banco fiquem misturadas.

### `src/config/`
Centraliza configurações reutilizáveis. Hoje a pasta existe para o arquivo `swagger.js`, que monta a especificação OpenAPI usada na rota `/api-docs` e em `/api-docs.json`.

### `src/routes/`
Define os endpoints da API. Cada arquivo agrupa rotas de um recurso:

- `auth.js`: cadastro e login
- `user.js`: perfil, listagem, atualização e remoção de usuários
- `session.js`: CRUD das sessões de monitoria
- `post.js`: CRUD de posts

Essa pasta existe para concentrar a camada HTTP: URL, verbo, middleware aplicado e controlador chamado.

### `src/controllers/`
Recebe a requisição já validada e executa a regra de negócio de cada recurso. É aqui que a API conversa com os models, monta respostas e decide códigos HTTP. A pasta existe para impedir que a lógica fique espalhada dentro das rotas.

### `src/models/`
Define os schemas do Mongoose e o formato dos dados salvos no MongoDB:

- `User.js`: usuários e seus perfis
- `Session.js`: sessões/agendamentos entre aluno e mentor
- `Post.js`: posts publicados por um usuário autenticado

Essa pasta existe porque o projeto precisa de uma camada clara de persistência, separada da lógica de requisição.

### `src/validators/`
Reúne schemas do Joi para validar o corpo das requisições antes que a regra de negócio rode. Isso reduz duplicação de validações dentro dos controllers e torna os erros de entrada mais previsíveis.

### `src/middlewares/`
Agrupa comportamentos transversais usados por várias rotas:

- `auth.js`: valida o token JWT e controla perfis autorizados
- `validate.js`: aplica os schemas do Joi
- `errorHandler.js`: transforma exceções em respostas HTTP padronizadas

Essa pasta existe porque autenticação, validação e tratamento de erros não pertencem a um único recurso.

### `uploads/`
Reservada para arquivos enviados pela aplicação. No estado atual ela está vazia, mas a presença da pasta faz sentido porque o projeto já possui dependência de upload (`multer`) e o model de usuário prevê campo de foto.

### `node_modules/`
Contém as dependências instaladas pelo npm. Existe para o runtime local funcionar, mas não faz parte da lógica do projeto.

## Papel dos arquivos principais da raiz

### `.env`
Armazena variáveis de ambiente sensíveis ou dependentes do ambiente. Pelo código atual, a aplicação usa:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` opcional
- `NODE_ENV` opcional

### `package.json`
Describe o projeto para o npm: nome, dependências, modo ES Modules e scripts.

### `package-lock.json`
Trava as versões exatas instaladas para manter ambientes consistentes.

## Como a aplicação se organiza internamente

O fluxo principal segue esta ordem:

1. `server.js` sobe o Express, carrega o `.env`, conecta no MongoDB e registra as rotas.
2. A rota recebe a requisição em `src/routes`.
3. Middlewares como autenticação e validação rodam antes do controller.
4. O controller executa a regra de negócio.
5. O model acessa o MongoDB quando necessário.
6. Se algo falhar, `errorHandler.js` padroniza a resposta de erro.

Essa separação facilita manutenção porque cada pasta responde por uma parte específica do sistema.

## Endpoints e recursos existentes

### Autenticação

- `POST /api/auth/register`
- `POST /api/auth/login`

### Usuários

- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Sessões

- `POST /api/sessions`
- `GET /api/sessions`
- `GET /api/sessions/:id`
- `PUT /api/sessions/:id`
- `DELETE /api/sessions/:id`

### Posts

- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

## Como executar

```bash
npm install
node src/server.js
```

Com a API em execução:

- documentação Swagger: `http://localhost:3000/api-docs`
- especificação JSON: `http://localhost:3000/api-docs.json`

