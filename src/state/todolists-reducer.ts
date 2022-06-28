import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof AddTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

type  ActionType =
    removeTodolistACType |
    addTodolistACType |
    changeTodolistTitleACType |
    changeTodolistFilterACType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todolistId1)
        }
        case "ADD-TODOLIST": {
            return [...state, {id: action.payload.todolistID, title: action.payload.newTodolistTitle, filter: 'all'}]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId2 ? {
                ...el,
                filter: action.payload.newFilter
            } : el)
        }
        default:
            return state
    }
}
export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST', payload: {todolistId1}
    } as const
}
export const AddTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST', payload: {newTodolistTitle, todolistID: v1()}
    } as const
}
export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId2, newTodolistTitle}


    } as const
}
export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {todolistId2, newFilter}
    } as const
}