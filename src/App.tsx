import { useEffect, useState } from 'react'
import type { Todo, TodoStatus } from './models/Todo.ts'
import * as todoService from './services/todoService.ts'
import TodoCard from './components/TodoCard.tsx'
import './App.css'

const statusLabels: Record<TodoStatus, string> = {
    OPEN: "Offen",
    IN_PROGRESS: "In Arbeit",
    DONE: "Erledigt",
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [description, setDescription] = useState<string>("")

    function loadTodos() {
        todoService.getAllTodos()
            .then(todos => setTodos(todos))
            .catch(error => console.error("Fehler beim Laden der Todos", error))
    }

    useEffect(() => {
        loadTodos()
    }, [])

    function handleAdd(event: React.FormEvent) {
        event.preventDefault()

        if (description.trim() === "") {
            return
        }

        todoService.addTodo(description)
            .then(() => {
                setDescription("")
                loadTodos()
            })
            .catch(error => console.error("Fehler beim Anlegen", error))
    }

    function handleStatusChange(todo: Todo, newStatus: TodoStatus) {
        todoService.updateTodo(todo.id, todo.description, newStatus)
            .then(() => loadTodos())
            .catch(error => console.error("Fehler beim Aktualisieren", error))
    }

    function handleDelete(id: string) {
        todoService.deleteTodo(id)
            .then(() => loadTodos())
            .catch(error => console.error("Fehler beim Löschen", error))
    }

    return (
        <div className="app">
            <h1>Todo App</h1>

            <form onSubmit={handleAdd} className="add-form">
                <input
                    type="text"
                    placeholder="Neues Todo..."
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                />
                <button type="submit">Hinzufügen</button>
            </form>

            <div className="board">
                {(["OPEN", "IN_PROGRESS", "DONE"] as TodoStatus[]).map(status => (
                    <section key={status} className="column">
                        <h2>{statusLabels[status]}</h2>
                        {todos
                            .filter(todo => todo.status === status)
                            .map(todo => (
                                <TodoCard
                                    key={todo.id}
                                    todo={todo}
                                    onStatusChange={handleStatusChange}
                                    onDelete={handleDelete}
                                />
                            ))}
                    </section>
                ))}
            </div>
        </div>
    )
}

export default App
