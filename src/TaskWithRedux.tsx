import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";

export type TaskPropType = {
	todolistId: string
	task: TaskType
}

const TaskWithRedux = memo(({task, todolistId}: TaskPropType) => {

	let {id, isDone, title} = {...task}

	const dispatch = useDispatch()

	const onClickHandler = () => dispatch(removeTaskAC(id, todolistId))

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked;
		dispatch(changeTaskStatusAC(id, newIsDoneValue, todolistId))
	}

	const onTitleChangeHandler = (newValue: string) => {
		dispatch(changeTaskTitleAC(id, newValue, todolistId))
	}

	return (
		<div className={isDone ? "is-done" : ""}>
			<Checkbox
				checked={isDone}
				color="primary"
				onChange={onChangeHandler}
			/>

			<EditableSpan value={title} onChange={onTitleChangeHandler}/>
			<IconButton onClick={onClickHandler}>
				<Delete/>
			</IconButton>
		</div>
	)
});

export default TaskWithRedux;