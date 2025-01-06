# Clients CRUD

Este projeto consiste no desenvolvimento de uma aplicação para o gerenciamento clientes, oferecendo funcionalidades robustas para atender às necessidades de controle e organização de dados.

### Funcionalidades Principais:

1. **Gerenciamento de Clientes** :

* Possibilidade de cadastrar, visualizar, editar e excluir informações de clientes de forma prática e intuitiva.

1. **Informações Pessoais** :

* Relacionamento de dados detalhados, como nome, endereço e outras informações relevantes ao cliente.

1. **Cartões de Crédito** :

* Adicionar e gerenciar múltiplos cartões de crédito vinculados a cada cliente, incluindo validação de dados, como número do cartão, data de validade e CVV.

### Objetivo do Projeto:

Fornecer uma solução eficiente e segura para armazenar e gerenciar dados sensíveis, garantindo a integridade e acessibilidade das informações relacionadas aos clientes e suas formas de pagamento.

### Tecnologias Utilizadas:

* **Frontend** : Next 14  + Typescript com integração de bibliotecas modernas para validação de formulários e mascaramento de dados.
* **Backend** : Construção de APIs robustas utilizando Laravel 11.
* **Banco de Dados** : Estruturação e gerenciamento de dados relacionais para clientes e cartões de crédito usando MySQL.

Este projeto destaca-se pela sua usabilidade, segurança e organização, tornando-o ideal para empresas que necessitam de uma gestão centralizada de clientes e informações financeiras.

# Como Iniciar a Aplicação

Passos necessários para configurar e executar o projeto **Clients CRUD**. Certifique-se de que os requisitos estejam instalados antes de prosseguir.

---

## Front-end

**Requisitos necessários**:

- Node.js
- npm (Node Package Manager)

**Passos para iniciar o front-end**:

1. Acesse o diretório do projeto:

   ```bash

   cd ~/area-de-trabalho/projetos/clients-crud/frontend

   ```
2. Copie o arquivo `.env.example` para `.env`:

   ```bash

   cp .env.example .env

   ```
3. Instale as dependências:

   ```bash

   npm install

   ```
4. Inicie o servidor de desenvolvimento:

   ```bash

   npm run dev

   ```
5. A aplicação será iniciada no endereço:

   [http://localhost:3001](http://localhost:3001)

---

---

## Back-end

**Requisitos necessários**:

- Composer
- Docker
- PHP

**Passos para iniciar o back-end**:

1. Acesse o diretório do projeto:

   ```bash
   cd ~/area-de-trabalho/projetos/clients-crud/backend
   ```
2. Copie o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```
3. Instale as dependências:

   ```bash
   composer install
   ```

   ou

   ```bash
   composer install --ignore-platform-reqs
   ```
4. Configure o comando sail:

   ```bash
   alias sail=./vendor/bin/sail
   ```
5. Inicie os containers Docker e construa a aplicação:

   ```bash
   sail up -d --build
   ```

   Verifique se todos os containers estão rodando com sucesso para prosseguir.
6. Execute as migrações do banco de dados:

   ```bash
   sail artisan migrate
   ```
7. (Opcional) Popule o banco de dados com dados iniciais:

   ```bash
   sail artisan db:seed
   ```
8. A API do projeto estará disponível no endereço:

   [http://localhost:8001](http://localhost:8001)

Com esses passos concluídos, o **Clients CRUD** estará em funcionamento, com o front-end e back-end devidamente configurados para desenvolvimento.

## Rotas backend autenticadas (com middleware `auth:sanctum`):

- `POST /clients` — Criação de um cliente.

  ```bash
   {
      "name": "Cliente2",
      "email": "email@email.com",
      "phone": "83 99999-9999",
      "address": "Rua dos bobos 2",
      "address_number": "2",
      "address_complement": "21323",
      "neighborhood": "Bairo Legal 2",
      "city": "Campina Grande 2",
      "state": "PB",
      "cep": "99999-999",
      "second_name": "Silva",
      "birth_day": "2024-01-10"
   }
  ```
- `GET /clients` — Listar todos os clientes.
- `GET /clients/{client}` — Exibir um cliente específico.
- `PUT /clients/{client}` — Atualizar um cliente específico.

  ```bash
   {
      "name": "33333",
      "email": "3333@3333.com",
      "phone": "+33 (33) 33333-3333",
      "address": "Rua dos bobos 3",
      "address_number": "3",
      "address_complement": null,
      "neighborhood": "Bairo Legal 3",
      "city": "Campina Grande 3",
      "state": "PB",
      "cep": "58433-795",
      "second_name": "Silva",
      "birth_day": "2024-01-10"
   }
  ```
- `DELETE /clients/{client}` — Deletar um cliente específico.

  ```

  ```
- `POST /credit-card/multiple` — Criar múltiplos cartões de crédito para um cliente.

  ```bash
   {
      "client_id": 1,
      "credit_cards": [
         {
               "cardholder_name": "John Doe",
               "card_number": "4111111111111111",
               "cardholder_document": "12345678901",
               "cvv": "123",
               "expiration_date": "12/25"
         }
      ]
   }
  ```
- `PUT /credit-card/multiple` — Atualizar múltiplos cartões de crédito.

  ```bash
   {
      "client_id": 1,
      "credit_cards": [
         {
               "id": 22,
               "cardholder_name": "Updated Name 3",
               "expiration_date": "12/26"
         }
      ]
   }
  ```
- `DELETE /credit-card/multiple` — Deletar múltiplos cartões de crédito.

  ```bash
   {
      "client_id": 3,
      "credit_card_ids": [1, 2]
   }
  ```
- `GET /credit-card` — Listar todos os cartões de crédito.
- `GET /credit-card/{creditCard}` — Exibir um cartão de crédito específico.
- `PUT /credit-card/{creditCard}` — Atualizar um cartão de crédito específico.

  ```bash
   {
      "cardholder_name": "AAAAA",
      "card_number": "4800 8178 6244 1234",
      "cardholder_document": "999.999.999-99",
      "expiration_date": "10/35",
      "cvv": "999",
      "client_id": 1
   }
  ```
- `DELETE /credit-card/{creditCard}` — Deletar um cartão de crédito específico.
- `GET /dashboard` — Exibir dados do dashboard.
- `GET /me` — Exibir informações do usuário autenticado.

## Rotas backend públicas (sem middleware):

- `POST /login` — Login do usuário.
  ```bash
     {
     "email": "joao@email.com",
     "password": "123456"
     }
  ```
- `POST /register` — Registro de um novo usuário.
  ```bash
     {
        "email": "joaof@oliveira.com.br",
        "password": "654321",
        "name": "Jonh"
     }
  ```
