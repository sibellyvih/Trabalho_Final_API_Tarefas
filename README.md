# API de Tarefas

API REST desenvolvida em Node.js para gerenciamento de tarefas, com autenticação JWT, banco SQLite e operações CRUD completas.

##### Aluna: Sibelly Vitória Antonio
---

## Funcionalidades

* Cadastro e login de usuários
* Autenticação com JWT
* CRUD de tarefas
* Relacionamento entre usuários e tarefas
* Filtros por status
* Paginação de resultados
* Validações de dados

---

## Tecnologias

* Node.js
* Express
* SQLite
* JWT (jsonwebtoken)
* Bcryptjs

---

## Autenticação

A API utiliza JWT. Após o login, utilize o token no header:

```bash
Authorization: Bearer SEU_TOKEN
```

---

##  Rotas

###  Usuários

| Método | Rota            | Descrição     |
| ------ | --------------- | ------------- |
| POST   | /users/register | Criar usuário |
| POST   | /users/login    | Login         |

---

### Tarefas

| Método | Rota       | Descrição        |
| ------ | ---------- | ---------------- |
| POST   | /tasks     | Criar tarefa     |
| GET    | /tasks     | Listar tarefas   |
| PUT    | /tasks/:id | Atualizar tarefa |
| DELETE | /tasks/:id | Deletar tarefa   |

---

## Filtros e Paginação

Exemplo:

```bash
/tasks?status=pending&page=1&limit=5
```

---

## Banco de Dados

* users
* tasks

Relacionamento:
Um usuário possui várias tarefas.

---

## Como rodar o projeto

```bash
npm install
npm run dev
```

Servidor:

```bash
http://localhost:3000
```

---

## Testes

As rotas foram testadas utilizando o Insomnia.

---

## Coleção Insomnia

Arquivo `.json` incluído no projeto para testes das rotas.

---
