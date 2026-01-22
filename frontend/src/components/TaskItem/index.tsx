import type React from "react"
import type { Task } from "../../types/TaskTypes"
import styles from "./TaskItem.module.css"
import doneIcon from "../../assets/done_icon.png";
import undoneIcon from "../../assets/undone_icon.png";
import { useState } from "react";

type TaskItemProps = {
    task: Task
    onComplete: (task_id:number) => void
}

function TaskItem ({task, onComplete}: TaskItemProps){

    const isTaskDone = task.task_status === "done"
    const [isSubmitting, setIsSubmitting] = useState(false)

    function completeTask(e: React.MouseEvent){
        e.preventDefault()

        if (isTaskDone) return

        setIsSubmitting(true)
        onComplete(task.task_id)
    }

    const getStatus = (status: string) => {
        if (status === "low") {
            return {
                label: "Baixa",
                Styles: styles.low_priority
            }
        }
        if (status === "medium") {
            return {
                label: "Média",
                Styles: styles.medium_priority
            }
        }
        if (status === "high") {
            return {
                label: "Alta",
                Styles: styles.high_priority
            }
        }
        
        return {
            label: "Status desconhecido",
            Styles: "",
        }     
    }

    const { label, Styles } = getStatus(task.task_priority);

    return (
        <div className={styles.task_container}>
            <div className={styles.task_information_container}>
                <p className={Styles}>{label} Prioridade</p>
                <p className={styles.task_title}>{task.task_title}</p>
                <p className={styles.task_description}>{task.task_description}</p>
                <p>Criado por: <strong className={styles.text_white_strong}>{task.task_created_by}</strong></p>
                <button onClick={completeTask} className={isTaskDone ? styles.task_button_disabled : styles.task_button} disabled={isTaskDone}>{isTaskDone ? "Concluída" : isSubmitting ? "Concluindo..." : "Concluir"}</button>
            </div>

            <div className={styles.task_status_container}>
                <p>Status: </p>
                <img src={task.task_status == "done" ? doneIcon : undoneIcon} alt="Status datarefa" className={styles.status_image}/>
            </div>
        </div>
    )
}

export default TaskItem

