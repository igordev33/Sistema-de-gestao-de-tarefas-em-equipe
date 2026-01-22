from math import ceil
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

import models
import schemas

from configs.session import get_db

task_router = APIRouter(prefix="/tasks", tags=["Tasks"])

@task_router.get("/")
def get_tasks(db:Session = Depends(get_db), page:int = 1, limit:int=12):

    query = db.query(models.Task).order_by(models.Task.task_id.desc())

    tasks = query.offset((page -1) * limit).limit(limit).all()

    if page < 1 or limit < 1:
        raise HTTPException(
            status_code=400,
            detail="Página ou limite inválidos!"
        )
    
    total_tasks = db.query(func.count(models.Task.task_id)).scalar()

    return {
        "page": page,
        "limit": limit,
        "total_tasks": total_tasks,
        "total_pages": ceil(total_tasks / limit),
        "tasks": [{
            "task_id": task.task_id, 
            "task_title": task.task_title, 
            "task_description": task.task_description, 
            "task_priority": task.task_priority, 
            "task_status": task.task_status, 
            "task_created_by": task.task_created_by
        } for task in tasks]}

        

@task_router.post("/", status_code=status.HTTP_201_CREATED)
def create_task(task:schemas.Create_task, db:Session = Depends(get_db)):

    new_task = models.Task(
        task_title = task.task_title, 
        task_description = task.task_description,
        task_priority = task.task_priority,
        task_status = task.task_status,
        task_created_by = task.task_created_by
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "message": "Task created successfully",
        "task": new_task
    }

@task_router.patch("/{task_id}")
def complete_task(task_id:int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found.")
    
    task.task_status = "done"

    db.commit()
    db.refresh(task)

    return {"message": "Task completed successfully."}
    
    