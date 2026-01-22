export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'pending' | 'done'
export type TaskCreatedBy = 'Igor' | 'Visitante'

export type CreateTaskData = {
    message: string
    task: Task
}

export type TaskCreate = {
    task_title: string
    task_description: string
    task_priority: TaskPriority
    task_status: TaskStatus
    task_created_by: TaskCreatedBy
}

export type Task = TaskCreate & {
    task_id: number 
}

export type PaginatedResponse<T> = {
  tasks: T[]
  page: number
  limit: number
  total_tasks: number
  total_pages: number
}