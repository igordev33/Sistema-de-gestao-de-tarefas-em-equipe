# 📋 Sistema de Gestão de Tarefas em Equipe

Sistema completo para **gestão de tarefas colaborativas**, permitindo organizar atividades, acompanhar o andamento e facilitar o trabalho em equipe.  
O projeto é dividido em **frontend** e **backend**, com execução simplificada através de **Docker**.

---

## 🚀 Funcionalidades

- 📝 Criação e conclusão de tarefas
- 📌 Definição de prioridade das tarefas
- 🔄 Atualização de status (pendente e concluída)
- 📄 Listagem paginada de tarefas
- 🔐 Autenticação via API
- 🌐 Integração completa entre frontend e backend
- 🐳 Execução com Docker e Docker Compose

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Python
- FastApi
- SQLalchemy
- Uvicorn

### Frontend
- TypeScript
- React
- Vite

### Infraestrutura
- Docker
- Docker Compose

## ▶️ Como Rodar o Projeto

### Pré-requisitos

- Docker
- Docker Compose

### Suba os containers

```
docker compose up --build
```

### Acesse a aplicação

- Fronted: http://localhost:5173
- Backend: http://localhost:8000

## IMPORTANTE!!!

Esse projeto possui váriaveis de ambiente em arquivos .env, para rodar a aplicação é necessário que seja criado um arquivo .env na raiz das pastas frontend e backend com as seguintes váriaveis:

### Frontend:

- VITE_API_URL=http://localhost:8000
- VITE_API_USER
- VITE_API_PASSWORD

### Backend:

Configurações do banco de dados:

- DB_USER
- DB_PASSWORD
- DB_HOST
- DB_PORT
- DB_NAME

Configurações de login e senha para a API

- API_USER
- API_PASSWORD

## 📄 Licença

Este projeto está sob a licença definida no arquivo LICENSE.