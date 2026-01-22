import { useState } from 'react'
import type { CreatedByFilter, FilterValues, PriorityFilter, StatusFilter } from '../../types/FilterFormTypes'
import styles from "./FilterForm.module.css"

type FilterFormProps = {
    onFilterChange: (filters: FilterValues) => void
    closeForm: () => void
}

function FilterForm({ onFilterChange, closeForm }: FilterFormProps) {
    const [priority, setPriority] = useState<PriorityFilter>('all')
    const [status, setStatus] = useState<StatusFilter>('all')
    const [createdBy, setCreatedBy] = useState<CreatedByFilter>('all')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        onFilterChange({ priority, status, createdBy})
        closeForm()
    }

    return (
        <div className={styles.background_div}>
            <form onSubmit={handleSubmit} className={styles.form_container}>
                <div className={styles.close_form_button_container}><button onClick={closeForm} className={styles.close_form_button}> X </button></div>
                <p className={styles.form_container_title}>Filtrar por: </p>

                <div className={styles.label_and_select_container}>
                    <label htmlFor="priority" className={styles.form_container_label}>Prioridade: </label>
                    <select id="priority" value={priority} onChange={e => setPriority(e.target.value as PriorityFilter)} className={styles.form_container_select}>
                        <option value="all">Todos</option>
                        <option value="high">Alta</option>
                        <option value="medium">Média</option>
                        <option value="low">Baixa</option>
                    </select>
                </div>

                <div className={styles.label_and_select_container}>
                    <label htmlFor="status" className={styles.form_container_label}>Status: </label>
                    <select id="status" value={status} onChange={e => setStatus(e.target.value as StatusFilter)} className={styles.form_container_select}>
                        <option value="all">Todos</option>
                        <option value="done">Conclúido</option>
                        <option value="pending">Pendente</option>
                    </select>
                </div>

                <div className={styles.label_and_select_container}>
                    <label htmlFor="created_by" className={styles.form_container_label}>Criado por: </label>
                    <select id="created_by" value={createdBy} onChange={e => setCreatedBy(e.target.value as CreatedByFilter)} className={styles.form_container_select}>
                        <option value="all">Todos</option>
                        <option value="Igor">Igor</option>
                        <option value="Visitante">Visitante</option>
                    </select>
                </div>

                <button type="submit" className={styles.form_container_button}>Filtrar</button>
            </form>
        </div>
    )
}

export default FilterForm