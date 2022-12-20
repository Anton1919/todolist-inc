import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./components/Input";
import EditableSpan from "./components/EditableSpan";
// import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';


export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	todoListID: string
	title: string
	tasks: Array<TaskType>
	removeTask: (todoListID: string, taskId: string) => void
	changeFilter: (taskId: string, value: FilterValuesType) => void
	addTask: (todoListID: string, title: string) => void
	changeTaskStatus: (todoListID: string, taskId: string, isDone: boolean) => void
	filter: FilterValuesType
	removeTodoList: (todoListID: string) => void
	updateTask: (todoListID: string, taskId: string, newTitle: string) => void
	updateTodoList: (odoListID: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

	// let [title, setTitle] = useState("")
	// let [error, setError] = useState<string | null>(null)

	// const addTask = () => {
	// 	if (title.trim() !== "") {
	// 		props.addTask(props.todoListID, title.trim());
	// 		setTitle("");
	// 	} else {
	// 		setError("Title is required");
	// 	}
	// }

	// const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setTitle(e.currentTarget.value)
	// }

	// const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
	// 	setError(null);
	// 	if (e.charCode === 13) {
	// 		addTask();
	// 	}
	// }

	const onAllClickHandler = () => props.changeFilter(props.todoListID, "all");
	const onActiveClickHandler = () => props.changeFilter(props.todoListID, "active");
	const onCompletedClickHandler = () => props.changeFilter(props.todoListID, "completed");

	const removeTodoListHandler = () => {
		props.removeTodoList(props.todoListID)
	}

	const addTaskHandler = (newTitle: string) => {
		props.addTask(props.todoListID, newTitle)
	}

	const upDateTodoListHandler = (newTitle: string) => {
		props.updateTodoList(props.todoListID, newTitle)
	}

	return <div>
		<h3>{/*{props.title}*/}
			<EditableSpan title={props.title} callback={upDateTodoListHandler}/>
			{/*<button onClick={removeTodoListHandler}>X</button>*/}

			{/*<Button variant="contained" onClick={removeTodoListHandler}>x</Button>*/}
			<IconButton aria-label="delete" onClick={removeTodoListHandler}>
				<DeleteIcon/>
			</IconButton>

		</h3>

		<Input callback={addTaskHandler}/>
		{/*<div>*/}
		{/*	<input value={title}*/}
		{/*				 onChange={onChangeHandler}*/}
		{/*				 onKeyPress={onKeyPressHandler}*/}
		{/*				 className={error ? "error" : ""}*/}
		{/*	/>*/}
		{/*	<button onClick={addTask}>+</button>*/}
		{/*	{error && <div className="error-message">{error}</div>}*/}
		{/*</div>*/}
		<ul>
			{
				props.tasks.map(t => {
					const onClickHandler = () => props.removeTask(props.todoListID, t.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked);
					}

					const updateTaskHandler = (newTitle: string) => {
						props.updateTask(props.todoListID, t.id, newTitle)
					}

					return <li key={t.id} className={t.isDone ? "is-done" : ""}>
						{/*<input type="checkbox"*/}
						{/*			 onChange={onChangeHandler}*/}
						{/*			 checked={t.isDone}/>*/}

						<Checkbox onChange={onChangeHandler} checked={t.isDone} defaultChecked/>


						{/*<span>{t.title}</span>*/}
						<EditableSpan title={t.title} callback={updateTaskHandler}/>

						<IconButton aria-label="delete" onClick={onClickHandler}>
							<DeleteIcon/>
						</IconButton>

						{/*<button onClick={onClickHandler}>L</button>*/}
					</li>
				})
			}
		</ul>
		<div>

			<Button variant={props.filter === "all" ? "outlined" : "contained"} color="success"
							onClick={onAllClickHandler}>All </Button>
			<Button variant={props.filter === "active" ? "outlined" : "contained"} color="error"
							onClick={onActiveClickHandler}>Active </Button>
			<Button variant={props.filter === "completed" ? "outlined" : "contained"}
							onClick={onCompletedClickHandler}>Completed </Button>

			{/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
			{/*				onClick={onAllClickHandler}>All*/}
			{/*</button>*/}
			{/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
			{/*				onClick={onActiveClickHandler}>Active*/}
			{/*</button>*/}
			{/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
			{/*				onClick={onCompletedClickHandler}>Completed*/}
			{/*</button>*/}
		</div>
	</div>
}
