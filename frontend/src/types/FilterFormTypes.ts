import type { TaskCreatedBy, TaskPriority, TaskStatus } from "./TaskTypes"

export type PriorityFilter = 'all' | 'high' | 'medium' | 'low'
export type StatusFilter = 'all' | 'done' | 'pending'
export type CreatedByFilter = 'all' | 'Igor' | 'Visitante'

export type FilterValues = {
  priority: TaskPriority | "all"
  status: TaskStatus | "all"
  createdBy: TaskCreatedBy | 'all'
}