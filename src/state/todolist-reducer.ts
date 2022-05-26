import {FilterValuesType, TodolistsType} from "../App";
import exp from "constants";
import {v1} from "uuid";


type ActionType  = removeTodolistACType | addTodolistACType | editTitleSpanACType |  changeFilterACType
type removeTodolistACType = ReturnType<typeof removeTodolistAC>
type  addTodolistACType = ReturnType<typeof addTodolistAC>
type editTitleSpanACType = ReturnType<typeof  editTitleSpanAC>
type changeFilterACType = ReturnType<typeof  changeFilterAC>
export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id != action.payload.todolistId1)
        }
        case "ADD-TODOLIST": {
             let newTodolist: TodolistsType = {id: action.payload.id, title: action.payload.newTodolistTitle, filter: 'all'}
            return [...state,newTodolist ]
        }
        case "CHANGE-TODOLIST-TITLE":{

           return state.map(el=> el.id === action.payload.id? {...el, title: action.payload.title}: el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return  state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter}: el)
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId1}
    } as const
}
export const addTodolistAC = ( id: string,newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {id,newTodolistTitle}

    }as const
}
export const editTitleSpanAC = (id: string, title: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id,title}
    }as const
   
}
export const changeFilterAC = (id :string, filter:  FilterValuesType ) => {
return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload:{id, filter}

}as const
}