from typing import Literal
from pydantic import BaseModel

class Create_task(BaseModel):
    task_title:str
    task_description:str
    task_priority: Literal["low", "medium", "high"]
    task_status: Literal["pending", "done"] = "pending"
    task_created_by: str