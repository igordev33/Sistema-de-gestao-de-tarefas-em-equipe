import { useState } from "react"
import type { TaskCreate, TaskCreatedBy, TaskPriority } from "../../types/TaskTypes"
import styles from "./TaskForm.module.css"

type CreateTaskFormProps = {
    onSubmit: (task: TaskCreate) => void
    closeForm: () => void
}

function CreateTaskForm({ onSubmit, closeForm }: CreateTaskFormProps) {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskPriority, setTaskPriority] = useState<TaskPriority>('low')
    const [taskCreatedBy, setTaskCreatedBy] = useState<TaskCreatedBy>('Igor')
    
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        onSubmit({
            task_title: taskTitle,
            task_description: taskDescription,
            task_priority: taskPriority,
            task_status: "pending",
            task_created_by: taskCreatedBy
        })

        closeForm()
    }

    return (
        <div className={styles.background_container}>
            <form onSubmit={handleSubmit} className={styles.form_container}>

                <div className={styles.close_form_button_container}><button onClick={closeForm}className={styles.close_form_button}> X </button></div>

                <label htmlFor="title" className={styles.form_container__title_label}>Título: </label>
                <input type="text" id="title" name="title" onChange={e => setTaskTitle(e.target.value)} className={styles.form_container__title_input}/>

                <br />

                <label htmlFor="description" className={styles.form_container__description_label}>Descrição: </label>

                <br />

                <textarea rows={5} id="description" name="description" maxLength={250} onChange={e => setTaskDescription(e.target.value)} className={styles.form_container__description_input}/>

                <br />

                <small>{taskDescription.length} / 250</small>

                <div className={styles.label_and_select_container}>
                    <label htmlFor="priority" className={styles.form_container__select_label}>Prioridade: </label>
                    <select id="priority" name="priority" onChange={e => setTaskPriority(e.target.value as TaskPriority)} className={styles.form_container__select}>
                        <option value="low">Baixa</option>
                        <option value="medium">Média</option>
                        <option value="high">Alta</option>
                    </select>
                </div>

                <div className={styles.label_and_select_container}>
                    <label htmlFor="created_by" className={styles.form_container__select_label}>Criado por: </label>
                    <select name="created_by" id="created_by" onChange={e => setTaskCreatedBy(e.target.value as TaskCreatedBy)} className={styles.form_container__select}>
                        <option value="Igor">Igor</option>
                        <option value="Visitante">Visitante</option>
                    </select>
                </div>

                <button type="submit" className={styles.form_container__button}>Criar Tarefa</button>
            </form>
        </div>
    )
}

export default CreateTaskForm