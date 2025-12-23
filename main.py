import secrets
from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import Boolean, create_engine, Column, Integer, String, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Variável de ambiente {name} não definida")
    return value

DATABASE_URL = require_env("DATABASE_URL")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit = False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI(
    title="API de tarefas",
    description="API para gerenciar uma lista de tarefas",
    version="1.0.0",
    contact={
        "name": "Igor Augusto",
        "email": "igoraf.dev33@hotmail.com"
    }
)

security = HTTPBasic()

meu_usuario = require_env("meu_usuario")
minha_senha = require_env("minha_senha")

class TarefaDB(Base):
    __tablename__ = "Tarefas"
    id = Column(Integer, index=True, primary_key=True, autoincrement=True)
    nome = Column(String, index=True)
    descricao = Column(String, index=True)
    concluida = Column(Boolean)

class Tarefa(BaseModel):
    nome: str
    descricao: str
    concluida: Optional[bool] = False

Base.metadata.create_all(bind=engine)

def session_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

#Funcão responsável por autenticar o usuário
def autenticar_usuario(credentials: HTTPBasicCredentials = Depends(security)):
    is_username_correct = secrets.compare_digest(credentials.username, meu_usuario)
    is_password_correct = secrets.compare_digest(credentials.password, minha_senha)

    if not(is_username_correct and is_password_correct):
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha incorretos!",
            headers={"WWW-Authenticate": "Basic"}
        )

#Getter function
@app.get("/buscar_tarefas")
def get_tarefas(page: int = 1, limit: int = 10, db = Depends(session_db), ordenar_por: str = "id", credentials: HTTPBasicCredentials = Depends(autenticar_usuario)):

    query = db.query(TarefaDB)

    if ordenar_por == "id":
        query = query.order_by(TarefaDB.id)
    elif ordenar_por == "nome":
        query = query.order_by(TarefaDB.nome)
    else:
        raise HTTPException(
            status_code=400,
            detail="Os dados só podem ser ordenados por nome ou id!"
        )

    #Grava os valores do banco de dados já paginados na váriavel tarefa
    tarefas = query.offset((page -1) * limit).limit(limit).all()

    if not tarefas:
        return{"message": "Você não possui tarefas cadastradas!"}
    
    if page < 1 or limit < 1:
        raise HTTPException(
            status_code=400,
            detail="Página ou limite inválidos!"
        )

    return {
        "page": page,
        "limit": limit,
        "total": db.query(func.count(TarefaDB.id)).scalar(),
        "Tarefas": [
            {"id": tarefa.id, "nome": tarefa.nome, "descricao": tarefa.descricao, "concluida": tarefa.concluida} for tarefa in tarefas
            ] 
    }

#Post function
@app.post("/adicionar_tarefa")
def post_tarefa(tarefa: Tarefa, db = Depends(session_db), credentials: HTTPBasicCredentials = Depends(autenticar_usuario)):

    tarefa_db = db.query(TarefaDB).filter(TarefaDB.nome == tarefa.nome).first()
    
    if tarefa_db:
        raise HTTPException(
            status_code=400,
            detail="Essa tarefa já esta cadastrada!"
        )

    nova_tarefa = TarefaDB(nome=tarefa.nome, descricao=tarefa.descricao, concluida=tarefa.concluida)

    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)

    return {"message": "A tarefa foi cadastrada com sucesso!"}

#delete function
@app.delete("/deletar_tarefa/{nome_tarefa}")
def excluir_tarefa(nome_tarefa: str, db = Depends(session_db), credentials: HTTPBasicCredentials = Depends(autenticar_usuario)):
    
    tarefa_db = db.query(TarefaDB).filter(TarefaDB.nome == nome_tarefa).first()

    if not tarefa_db:
        raise HTTPException(status_code=404, detail="Não foi possível encontrar essa tarefa no seu banco de dados!")
    
    db.delete(tarefa_db)
    db.commit()

    return {"message": "Tarefa excluída com sucesso!"}



#Função que conclui a tarefa
@app.put("/concluir_tarefa/{nome_tarefa}")
def concluir_tarefa(nome_tarefa: str, db = Depends(session_db), credentials: HTTPBasicCredentials = Depends(autenticar_usuario)):

    db_tarefa = db.query(TarefaDB).filter(TarefaDB.nome == nome_tarefa).first()

    if not db_tarefa:
        raise HTTPException(
            status_code=404,
            detail="Não foi possível encontrar tarefa com esse nome!"
        )
    
    db_tarefa.concluida = True
    db.commit()
    db.refresh(db_tarefa)

    return {"message": f'Tarefa "{nome_tarefa}" concluída com sucesso!'}
    



