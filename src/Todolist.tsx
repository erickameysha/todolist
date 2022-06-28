import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    id: string
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (todolistID: string, title: string) => void
    onChangeTaskStatus: (id: string,  isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removetodolist: (todolistID: string) => void
    editTitleSpan: (todolistID: string,newTitle: string)=> void
    editTaskSpan: (todolistID: string,tID: string,newTitle: string) => void


}
export const Todolist = (props: PropsType) => {
    const allChangeFilter = () => props.changeFilter('all', props.todolistID)
    const activeChangeFilter = () => props.changeFilter('active', props.todolistID)
    const completedChangeFilter = () => props.changeFilter('completed', props.todolistID)


    const removetodolistHandler = () => props.removetodolist(props.todolistID)
    const addTaskHandler = (title: string) => props.addTask( props.todolistID, title)

    const changeEditSpan = (newTitle: string) => {
     props.editTitleSpan(props.todolistID, newTitle)
   }
    const changeTask = (tID:string,newTitle: string) => {
       props.editTaskSpan(props.todolistID,tID, newTitle)
    }


    return (
        <div>
            <h3>
                <EditableSpan   title={props.title} callback={changeEditSpan}/>
                {/*{props.title}*/}
                <button onClick={removetodolistHandler}>+</button>
            </h3>

            <AddItemForm callback={addTaskHandler}/>
            <ul>
                {props.tasks.map(el => {
                    const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
                        let newStatusValue = e.currentTarget.checked
                        props.onChangeTaskStatus(el.id, newStatusValue, props.todolistID )
                    }

                    return (<li key={el.id}>
                        <button onClick={() => props.removeTask(props.todolistID, el.id)}>+</button>
                        <input type="checkbox" checked={el.isDone} onChange={onKeyChange}/>
                        {/*<span>{el.title}</span>*/}
                        <EditableSpan title={el.title} callback={(newTitle)=>changeTask(el.id, newTitle)} />

                    </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={allChangeFilter}>all
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={activeChangeFilter}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={completedChangeFilter}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist