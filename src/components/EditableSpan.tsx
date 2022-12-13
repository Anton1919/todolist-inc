import React, {ChangeEvent, useState} from 'react';

type PropsType = {
	title: string
	callback: (newTitle: string) => void
}

const EditableSpan = (props: PropsType) => {

	const [edit, setEdit] = useState(false)
	let [newTitle, setNewTitle] = useState(props.title)

	const editHandler = () => {
		setEdit(!edit)
		props.callback(newTitle)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTitle(e.currentTarget.value)
	}

	return (
		edit
			? <input value={newTitle} autoFocus onBlur={editHandler} onChange={onChangeHandler}/>
			: <span onDoubleClick={editHandler}>{newTitle}</span>
	);
};

export default EditableSpan;