import React, {useState} from 'react';

import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed"
export type taskTypeProps = {
    id: string, title: string, isDone: boolean
}
export type TasksStateType ={
    [key: string]: Array<taskTypeProps>
}

export type TodolistType = {
    id: string, title: string, filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const addTodolist = (newTitle: string) => {
        debugger
        let newId = v1()
        let newTodolist: TodolistType = {id: newId, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newId]: []})

    }
    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(e => e.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})

    }

    const removeTask = ( id: string,todolistID: string,) => {
        // let filteredTask = tasks.filter(t => t.id != id)
        // setTasks(filteredTask)
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((t) => t.id !== id)})
    }

    const addTask = ( title: string,todolistID: string) => {
        debugger
        let newTask = {id: v1(), title: title, isDone: false}
        // setTask([newTask, ...tasks])
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const editTitleSpan = (todolistID: string,newTitle: string) => {
        console.log(editTaskSpan)
        console.log('ku')
    setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle}: el))
    }
  const editTaskSpan = (todolistID: string,newTitle: string,tID: string,) => {
        console.log('ku')
    // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle}: el))
      setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === tID ? {...el, title: newTitle}: el)})
    }

    const onChangeTaskStatus = (id: string,  isDone: boolean, todolistID: string) => {
        // setTask(tasks.map(e => e.id === id ? {...e, isDone: isDone} : e))
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(e => e.id === id ? {...e, isDone: isDone} : e)})
    }


    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
        // setFilter(value)
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
                            editTitleSpan ={editTitleSpan}
                            editTaskSpan = {editTaskSpan}

                        />
                    )
                })
            }

        </div>
    );
}

export default App;
