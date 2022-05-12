import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, taskTypeProps} from "./App";


type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (todolistID: string, title: string) => void
    onChangeTaskStatus: (todolistID: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    removetodolist: (todolistID: string) => void


}
export const Todolist = (props: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const allChangeFilter = () => props.changeFilter('all', props.todolistID)
    const activeChangeFilter = () => props.changeFilter('active', props.todolistID)
    const completedChangeFilter = () => props.changeFilter('completed', props.todolistID)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistID, title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const removetodolistHandler = () => {
        props.removetodolist(props.todolistID)
    }
    return (
        <div>
            <h3>
                {props.title}
                <button onClick={removetodolistHandler}>+</button>
            </h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(el => {
                    const onKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
                        let newStatusValue = e.currentTarget.checked
                        props.onChangeTaskStatus(props.todolistID, el.id, newStatusValue)
                    }
                    return (<li key={el.id}>
                        <button onClick={() => props.removeTask(props.todolistID, el.id)}>+</button>
                        <input type="checkbox" checked={el.isDone} onChange={onKeyChange}/>
                        <span>{el.title}</span>

                    </li>)
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={allChangeFilter}>all
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={activeChangeFilter}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={completedChangeFilter}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist