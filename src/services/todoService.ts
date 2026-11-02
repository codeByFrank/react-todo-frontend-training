import axios from 'axios'
import type { Todo, TodoStatus } from '../models/Todo.ts'

export function getAllTodos(): Promise<Todo[]> {
    return axios.get<Todo[]>("/api/todo")
        .then(response => response.data)
}

export function addTodo(description: string): Promise<Todo> {
    return axios.post<Todo>("/api/todo", { description: description, status: "OPEN" })
        .then(response => response.data)
}

export function updateTodo(id: string, description: string, status: TodoStatus): Promise<Todo> {
    return axios.put<Todo>(`/api/todo/${id}`, { description: description, status: status })
        .then(response => response.data)
}

export function deleteTodo(id: string): Promise<void> {
    return axios.delete(`/api/todo/${id}`)
        .then(() => undefined)
}
