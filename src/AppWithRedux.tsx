import React from 'react';
import './App.css';
import AddItemForm from "./AddItemForm";
import {AddTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import Todolist1 from "./Todolist1";


export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string, title: string, filter: FilterValuesType
}

function AppWithRedux() {
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let dispatch = useDispatch()
    const addTodolist = (newTitle: string) => {
        dispatch(AddTodolistAC(newTitle))
    }
    return (
        <div className='App'>
            <AddItemForm callback={addTodolist}/>
            {
                todolists.map((el) => {
                    return (
                        <Todolist1
                            key={el.id}
                            todolists={el}
                        />
                    )
                })
            }

        </div>
    );
}

export default AppWithRedux;
