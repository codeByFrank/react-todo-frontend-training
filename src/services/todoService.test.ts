import { describe, expect, test, vi } from 'vitest'
import axios from 'axios'
import * as todoService from './todoService.ts'
import type { Todo } from '../models/Todo.ts'

vi.mock('axios')

describe('todoService', () => {

    test('getAllTodos_shouldReturnAllTodos', async () => {
        const expectedTodos: Todo[] = [
            { id: "1", description: "spazieren", status: "OPEN" },
            { id: "2", description: "lernen", status: "IN_PROGRESS" },
        ]

        vi.mocked(axios.get).mockResolvedValue({ data: expectedTodos })

        const actualTodos = await todoService.getAllTodos()

        expect(actualTodos).toEqual(expectedTodos)
        expect(axios.get).toHaveBeenCalledWith("/api/todo")
    })

    test('addTodo_shouldPostTodoWithStatusOpen', async () => {
        const expectedTodo: Todo = { id: "1", description: "spazieren", status: "OPEN" }

        vi.mocked(axios.post).mockResolvedValue({ data: expectedTodo })

        const actualTodo = await todoService.addTodo("spazieren")

        expect(actualTodo).toEqual(expectedTodo)
        expect(axios.post).toHaveBeenCalledWith("/api/todo", { description: "spazieren", status: "OPEN" })
    })

    test('updateTodo_shouldPutNewStatus', async () => {
        const expectedTodo: Todo = { id: "1", description: "spazieren", status: "DONE" }

        vi.mocked(axios.put).mockResolvedValue({ data: expectedTodo })

        const actualTodo = await todoService.updateTodo("1", "spazieren", "DONE")

        expect(actualTodo).toEqual(expectedTodo)
        expect(axios.put).toHaveBeenCalledWith("/api/todo/1", { description: "spazieren", status: "DONE" })
    })

    test('deleteTodo_shouldCallDeleteEndpoint', async () => {
        vi.mocked(axios.delete).mockResolvedValue({})

        await todoService.deleteTodo("1")

        expect(axios.delete).toHaveBeenCalledWith("/api/todo/1")
    })
})
