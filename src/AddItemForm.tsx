import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type AddItemFormType ={
    callback: (title: string)=> void
}
const AddItemForm = (props:  AddItemFormType) =>  {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        let newTitle = title.trim()
        if (newTitle!== '') {
            props.callback(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

export default AddItemForm;