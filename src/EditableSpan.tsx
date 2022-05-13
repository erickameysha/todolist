import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callback: (newTitle: string)=> void

}

const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        props.callback(newTitle)

    }
    return (
        edit
            ? <input onChange={onChangeHandler}onBlur={onDoubleClickHandler} autoFocus value={newTitle}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
};

export default EditableSpan;