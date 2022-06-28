import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";


type  ActionType =
    removeTaskACType |
    addTaskACType |
    changeTaskStatusACType|
    changeTaskTitleACType |
    addTodolistACType|
    removeTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId1]: state[action.payload.todolistId1].filter(
                (t)=> t.id !== action.payload.id)}
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}

           return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case 'CHANGE-TASK-STATUS':{
            return {
            ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(e => e.id === action.payload.id ? {...e, isDone: action.payload.isDone} : e)}
        }
        case "CHANGE-TASK-TITLE":{
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(e=> e.id === action.payload.id? {...e, title: action.payload.newTitle}: e)
            }
        }
        case "ADD-TODOLIST":{
            return {
                ...state,
               [action.payload.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST":{
                 const copyState ={...state}
            delete copyState[action.payload.todolistId1]
            return copyState
        }
        default:

            return state
    }
}
export const removeTaskAC = (id: string, todolistId1: string) => {
    return {
        type: 'REMOVE-TASK',
    payload:{id, todolistId1}
    } as const
}
export const addTaskAC = (title: string,todolistID:string) => {
    return {
        type: 'ADD-TASK',
        payload: { title, todolistID}
    } as const
}
export const changeTaskStatusAC = (id: string,  isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: { id, isDone,todolistID}
    } as const
}
export const changeTaskTitleAC = (id: string,  newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: { id, newTitle,todolistID}
    } as const
}
