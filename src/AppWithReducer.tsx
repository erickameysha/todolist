import React, {useReducer} from 'react';

import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    AddTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed"
function AppWithReducer() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const addTodolist = (newTitle: string) => {
        let actionTodolist= AddTodolistAC(newTitle)
        dispatchTodolists(actionTodolist)
        dispatchTasks(actionTodolist)


    }
    const removeTodolist = (todolistID: string) => {
        let action = removeTodolistAC(todolistID)
        dispatchTasks(action)
        dispatchTodolists(action)


    }

    const removeTask = ( id: string,todolistID: string,) => {
        let action = removeTaskAC(id, todolistID)
        dispatchTasks(action)

    }

    const addTask = ( title: string,todolistID: string) => {
        let action = addTaskAC(title, todolistID)
        dispatchTasks(action)
    }
    const changeTodolistTitle = (todolistID: string,newTitle: string) => {
        let action =  changeTodolistTitleAC(todolistID, newTitle)
        dispatchTodolists(action)
    }
  const changeTaskTitle = (todolistID: string,newTitle: string,tID: string,) => {
      let action= changeTaskTitleAC( todolistID, newTitle, tID)
      dispatchTasks(action)
    }

    const onChangeTaskStatus = (id: string,  isDone: boolean, todolistID: string) => {
        let action = changeTaskStatusAC(id,isDone, todolistID )
        dispatchTasks(action)
    }


    const changeFilter = ( value: FilterValuesType,todolistID: string) => {
        let action = changeTodolistFilterAC(todolistID, value)
        dispatchTodolists(action)
    }


    return (
        <div className='App'>
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map((el) => {
                    let taskForTodolist = tasks[el.id]
                    if (el.filter === 'active') {
                        taskForTodolist = tasks[el.id].filter(t => !t.isDone)
                    }
                    if (el.filter === 'completed') {
                        taskForTodolist = tasks[el.id].filter(t => t.isDone)
                    }

                    return (
                        <Todolist
                            id={ el.id}
                            key={el.id}
                            todolistID={el.id}
                            title={el.title}
                            removeTask={removeTask}
                            tasks={taskForTodolist}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            onChangeTaskStatus={onChangeTaskStatus}
                            filter={el.filter}
                            removetodolist={removeTodolist}
                            editTitleSpan ={changeTodolistTitle}
                            editTaskSpan = {changeTaskTitle}

                        />
                    )
                })
            }

        </div>
    );
}

export default AppWithReducer;
