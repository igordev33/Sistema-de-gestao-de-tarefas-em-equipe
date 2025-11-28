Este projeto é uma API RESTful desenvolvida com FastAPI, Python e SQLAlchemy, criada para treinar conceitos fundamentais de backend, autenticação e manipulação de banco de dados.

A API permite cadastrar, visualizar, concluir e deletar tarefas armazenadas em um banco SQLite.

A API oferece recursos completos para gerenciamento de tarefas:

-Cadastrar uma nova tarefa
    Evita cadastros duplicados
    Validações básicas com Pydantic

-Listar tarefas com paginação
    Suporte a page e limit
    Permite ordenar resultados por id ou nome
    Retorna também o total de tarefas cadastradas

-Excluir uma tarefa
    Exclusão pelo nome da tarefa
    Verificação de existência antes de remover

-Concluir tarefa
    Atualiza o campo concluida para true
    Apenas se a tarefa existir

-Autenticação via HTTP Basic
    Todas as rotas são protegidas
    Credenciais configuradas no próprio código (admin / admin)

Tecnologias Utilizadas:
-Python 3
-FastAPI
-SqlAlchemy
-Pydantic
-SQLite
-HTTP Basic Auth
-Uvicorn