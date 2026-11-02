import type { Todo, TodoStatus } from '../models/Todo.ts'

type TodoCardProps = {
    todo: Todo
    onStatusChange: (todo: Todo, newStatus: TodoStatus) => void
    onDelete: (id: string) => void
}

export default function TodoCard({ todo, onStatusChange, onDelete }: TodoCardProps) {
    return (
        <article className="todo-card">
            <p>{todo.description}</p>
            <div className="actions">
                {todo.status !== "OPEN" && (
                    <button onClick={() => onStatusChange(todo, todo.status === "DONE" ? "IN_PROGRESS" : "OPEN")}>
                        ← Zurück
                    </button>
                )}
                {todo.status !== "DONE" && (
                    <button onClick={() => onStatusChange(todo, todo.status === "OPEN" ? "IN_PROGRESS" : "DONE")}>
                        Weiter →
                    </button>
                )}
                <button className="delete" onClick={() => onDelete(todo.id)}>
                    Löschen
                </button>
            </div>
        </article>
    )
}
