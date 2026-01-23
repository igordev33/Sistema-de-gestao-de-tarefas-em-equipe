import secrets
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
import os

load_dotenv()

def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Váriavel de ambiente {name} não definida")
    return value

security = HTTPBasic()

meu_usuario = require_env("API_USER")
minha_senha = require_env("API_PASSWORD")


def autenticar_usuario(credentials: HTTPBasicCredentials = Depends(security)):
    is_username_correct = secrets.compare_digest(credentials.username, meu_usuario)
    is_password_correct = secrets.compare_digest(credentials.password, minha_senha)

    if not(is_username_correct and is_password_correct):
        raise HTTPException(
            status_code=401,
            detail="Usuário ou senha incorretos!",
            headers={"WWW-Authenticate": "Basic"}
        )