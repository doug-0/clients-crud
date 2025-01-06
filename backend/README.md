<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

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
