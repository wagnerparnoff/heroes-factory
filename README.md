# Heroes Factory

O **Heroes Factory** é uma aplicação completa (Fullstack) para gerenciamento de heróis. O projeto está estruturado em um monorepo contendo uma API backend e uma UI.

## 🚀 Tecnologias Utilizadas

### Backend (`/backend`)
- **Node.js** com **Express**
- **TypeScript**
- **Prisma ORM** (conectado a um banco de dados MySQL)
- **Zod** para validação de dados
- **Swagger** para documentação da API
- **Jest** e **Supertest** para testes automatizados

### Frontend (`/frontend`)
- **React** (via **Vite**)
- **TypeScript**
- **Mantine UI** para a biblioteca de componentes e formulários
- **React Query** (`@tanstack/react-query`) para gerenciamento de estado assíncrono e cache
- **Axios** para requisições HTTP
- **Zod** para validação no lado do cliente

---

## 📁 Estrutura do Projeto

```text
heroes-factory/
├── backend/          # API RESTful, regras de negócio e infraestrutura (Prisma)
├── frontend/         # Aplicação React SPA
└── docker-compose.yml # Orquestração dos containers (Banco de Dados, Backend, Frontend)
```

---

## ⚙️ Como Executar o Projeto

Você pode executar o projeto utilizando **Docker** (recomendado para simplificar as dependências) ou rodar tudo **manualmente** em sua máquina.

### Opção 1: Usando Docker (Recomendado)

**Pré-requisitos:**
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

1. Na raiz do projeto, suba os containers:
   ```bash
   docker-compose up -d
   ```
   *Isso iniciará o banco de dados MySQL, o servidor backend e a aplicação frontend.*

2. **Acessando as aplicações:**
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:3333](http://localhost:3333)
   - *O banco de dados estará exposto na porta 3306.*

*(Nota: Para popular o banco de dados pela primeira vez com dados iniciais, você pode rodar o seed de dentro do container do backend ou utilizando a configuração local abaixo).*
