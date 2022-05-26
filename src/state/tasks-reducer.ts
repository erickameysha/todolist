import {TaskStateType} from "../App";
import {v1} from "uuid";

type ActionType = removeTodolistACType | addTaskACType | changeTaskStatusACType |changeTaskTitleACType | addTodolistACType
type removeTodolistACType = ReturnType<typeof removeTaskAC>
type  addTaskACType = ReturnType<typeof addTaskAC>
type  addTodolistACType = ReturnType<typeof AddTodolistAC>
type  changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type  changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>



export const tasksReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":{

            return {...state, [action.todolistID]: state[action.todolistID].filter(t=> t.id !== action.taskID)}
        }
        case "ADD-TASK": {
            let task = {id: v1(), title: action.title, isDone: false}
            return  {...state, [action.todolistId]: [task, ...state[action.todolistId]] }

        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.todolistId]: state[action.todolistId].map(el=> el.id === action.taskID ? {...el, isDone: action.isDone}: el)}
        }
        case "CHANGE-TASK-TITLE":{
            return {...state, [action.todolistId]: state[action.todolistId].map(el=> el.id === action.taskID ? {...el, title: action.title}: el)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID:string) =>
    ({type: 'REMOVE-TASK', taskID, todolistID} as const)
export const addTaskAC = (title: string, todolistId: string) =>
    ({type: 'ADD-TASK', title, todolistId} as const)
export const AddTodolistAC = (title: string) =>
    ({type: 'ADD-TODOLIST', title, todolistId: v1()} as const)
export const changeTaskStatusAC = (taskID: string,isDone: boolean, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', taskID,isDone, todolistId} as const)
export const changeTaskTitleAC = (taskID: string,title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', taskID,title, todolistId} as const)


