import styles from "./PaginationComponent.module.css"

type PaginationProps = {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

function PaginationComponent({ currentPage, totalPages, onChange }: PaginationProps) {
  return (
    <div className={styles.page_container}>
        <button disabled={currentPage <= 1} className={`${styles.page_button} ${styles.decrease_page_button} ${currentPage <= 1 ? styles.disabled_button : ""}`}>{"<"}</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => onChange(page)} disabled={page === currentPage} className={`${styles.page_button} ${page === currentPage ? styles.disabled_button : ""}`}>{page} </button>
        ))}
        <button disabled={currentPage >= totalPages} className={`${styles.page_button} ${styles.increase_page_button} ${currentPage >= totalPages ? styles.disabled_button : ""}`}>{">"}</button>
    </div>
  )
}

export default PaginationComponent