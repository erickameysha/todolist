import React, {useState} from 'react';

import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";


export type FilterValuesType = "all" | "active" | "completed"
export type taskTypeProps = {
    id: string, title: string, isDone: boolean
}
export type TaskStateType ={
    [key: string]: Array<taskTypeProps>
}

export type TodolistsType = {
    id: string, title: string, filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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
        let newId = v1()
        let newTodolist: TodolistsType = {id: newId, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newId]: []})

    }
    const removeTodolist = (todolistID: string) => {
        console.log(todolistID)
        setTodolists(todolists.filter(e => e.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})

    }

    const removeTask = (todolistID: string, id: string) => {
        // let filteredTask = tasks.filter(t => t.id != id)
        // setTasks(filteredTask)
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((t) => t.id !== id)})
    }

    const addTask = (todolistID: string, title: string) => {
        debugger
        let newTask = {id: v1(), title: title, isDone: false}
        // setTask([newTask, ...tasks])
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const editTitleSpan = (todolistID: string,newTitle: string) => {
        console.log('ku')
    setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle}: el))
    }
  const editTaskSpan = (todolistID: string,tID: string,newTitle: string) => {
        console.log('ku')
    // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle}: el))
      setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === tID ? {...el, title: newTitle}: el)})
    }

    const onChangeTaskStatus = (todolistID: string, id: string, isDone: boolean) => {
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
