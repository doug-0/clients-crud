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
2. Instale as dependências:

   ```bash

   npm install

   ```
3. Inicie o servidor de desenvolvimento:

   ```bash

   npm run dev

   ```
4. A aplicação será iniciada no endereço:

   [http://localhost:3001](http://localhost:3001)

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
2. Instale as dependências:

   ```bash

   composer install

   ```
3. Configure o comando `sail`:

   ```bash

   alias sail=./vendor/bin/sail

   ```
4. Inicie os containers Docker e construa a aplicação:

   ```bash

   sail up -d --build

   ```
5. Execute as migrações do banco de dados:

   ```bash

   sail artisan migrate

   ```
6. (Opcional) Popule o banco de dados com dados iniciais:

   ```bash

   sail artisan db:seed

   ```
7. A API do projeto estará disponível no endereço:

   [http://localhost:8001](http://localhost:8001)

---

Com esses passos concluídos, o **Clients CRUD** estará em funcionamento, com o front-end e back-end devidamente configurados para desenvolvimento.
