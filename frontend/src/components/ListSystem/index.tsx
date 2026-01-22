import { useEffect, useMemo, useState } from "react"
import type { FilterValues } from "../../types/FilterFormTypes"
import type { CreateTaskData, Task, TaskCreate, PaginatedResponse } from "../../types/TaskTypes"
import CreateTaskForm from "../CreateTaskForm"
import FilterForm from "../FilterForm"
import TaskItem from "../TaskItem"
import styles from "./ListSystem.module.css"
import axios from "axios"
import PaginationComponent from "../PaginationComponent"

function ListSystem() {
  const api_url = import.meta.env.VITE_API_URL

  const [taskList, setTaskList] = useState<Task[]>([])
  const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false)
  const [showFilterForm, setShowFilterForm] = useState<boolean>(false)
  const [filterValues, setFilterValues] = useState<FilterValues>({
    priority: "all",
    status: "all",
    createdBy: "all"
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const showingCreateTaskForm = () => {
    setShowCreateTaskForm(true)
  }

  const closingCreateTaskForm = () => {
    setShowCreateTaskForm(false)
  }

  const showingFilterForm = () => {
    setShowFilterForm(true)
  }

  const closingFilterForm = () => {
    setShowFilterForm(false)
  }

  // Busca os dados da Api ao montar o componente
  useEffect(() => {
    fetch(`${api_url}/tasks?page=${currentPage}`)
      .then(response => response.json() as Promise<PaginatedResponse<Task>>) 
      .then(data => { 
        setTaskList(data.tasks)
        setTotalPages(data.total_pages) 
      })
      .catch(error => console.error("Erro ao buscar dados de tarefas", error))
  }, [currentPage])

  // Função responsável por completar uma tarefa
  const completeTask = (task_id: number) => {
    fetch(`${api_url}/tasks/${task_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_status: "done"
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar tarefa")
        }

        setTaskList(prev => prev.map(task =>
          task.task_id === task_id ? { ...task, task_status: "done" } : task
        ))
      })
  }

  //função responsável por criar uma tarefa
  const createTask = (dados: TaskCreate) => {
    axios.post<CreateTaskData>(`${api_url}/tasks`, dados)
      .then(response => setTaskList(prev => [response.data.task, ...prev]))
      .catch(error => console.error("Erro ao cadastrar tarefa", error))
  }

  // função responsável por aplicar os filtros
  const filterTasks = (filter: FilterValues) => {
    setFilterValues(filter)
  }

  // Guarda em uma váriavel uma lista já filtrada
  const filteredTasks = useMemo(() => {
    return taskList.filter(task => {

      const priorityMatch =
        filterValues.priority === "all" ||
        task.task_priority === filterValues.priority

      const statusMatch =
        filterValues.status === "all" ||
        task.task_status === filterValues.status

      const createdByMatch =
        filterValues.createdBy === "all" ||
        task.task_created_by === filterValues.createdBy

      return priorityMatch && statusMatch && createdByMatch
    })
  }, [taskList, filterValues])

  return (
    <main className={styles.main}>
      <div className={styles.main__button_container}>
        <button onClick={showingCreateTaskForm} className={styles.main__add_button}>+ Nova Tarefa</button>
        <button onClick={showingFilterForm} className={styles.main__filter_button}>Filtrar</button>
      </div>

      {showCreateTaskForm && <CreateTaskForm onSubmit={createTask} closeForm={closingCreateTaskForm} />}

      {showFilterForm && <FilterForm onFilterChange={filterTasks} closeForm={closingFilterForm} />}

      {filteredTasks.map((data) => {
        return (
          <TaskItem task={data} onComplete={completeTask} key={data.task_id} />
        )
      })}

      <PaginationComponent currentPage={currentPage} totalPages={totalPages} onChange={setCurrentPage}/>
    </main>
  )
}

export default ListSystem