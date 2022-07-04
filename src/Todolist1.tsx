import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./AppWithReducer";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import AppWithRedux, {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";


type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    todolists: TodolistType,


}
export const Todolist1 = ({todolists}: PropsType) => {


    const {id, title, filter}= {...todolists}
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state=> state.tasks[id])


    const dispatch= useDispatch()
    const allChangeFilter = () =>  dispatch(changeTodolistFilterAC(id, 'all'))
    const activeChangeFilter = () =>dispatch(changeTodolistFilterAC(id, "active"))
    const completedChangeFilter = () =>dispatch(changeTodolistFilterAC(id, "completed"))


    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }


    const removetodolistHandler = () => dispatch( removeTodolistAC(id))
    const addTaskHandler = (title: string) => dispatch(addTaskAC(title, id))

    const changeEditSpan = (newTitle: string) => {



   }
    const changeTask = (tID:string,newTitle: string) => {
      dispatch(changeTodolistTitleAC(id, newTitle))
    }


    return (
        <div>
            <h3>
                <EditableSpan   title={title} callback={(newTitle) =>changeTask(id,newTitle) }/>
                {/*{props.title}*/}
                <button onClick={removetodolistHandler}>+</button>
            </h3>

            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {tasks.map(el => {
                    const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
                        let newStatusValue = e.currentTarget.checked
                        // props.onChangeTaskStatus(el.id, newStatusValue, todolistID )
                        dispatch(changeTaskStatusAC(el.id, newStatusValue,  id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                       dispatch(changeTaskTitleAC(el.id, newValue, id))
                    }

                    return (<li key={el.id}>
                        <button onClick={() =>  dispatch(removeTaskAC(el.id, id))}>+</button>
                        <input type="checkbox" checked={el.isDone} onChange={onKeyChange}/>
                        {/*<span>{el.title}</span>*/}
                        <EditableSpan title={el.title} callback={onTitleChangeHandler} />

                    </li>)
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={allChangeFilter}>all
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={activeChangeFilter}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''} onClick={completedChangeFilter}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist1