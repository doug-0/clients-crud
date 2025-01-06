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
