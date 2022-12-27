import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from "./components/Input";
import ButtonAppBar from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksType = {
	[key: string]: TaskType[]
}

function App() {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState<TasksType>({
		[todolistID1]: [
			{id: v1(), title: "HTML&CSS", isDone: true},
			{id: v1(), title: "JS", isDone: true},
			{id: v1(), title: "ReactJS", isDone: false},
			{id: v1(), title: "Rest API", isDone: false},
			{id: v1(), title: "GraphQL", isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: "HTML&CSS2", isDone: true},
			{id: v1(), title: "JS2", isDone: true},
			{id: v1(), title: "ReactJS2", isDone: false},
			{id: v1(), title: "Rest API2", isDone: false},
			{id: v1(), title: "GraphQL2", isDone: false},
		]
	});

	const updateTask = (todoListID: string, taskId: string, newTitle: string) => {
		setTasks({
			...tasks, [todoListID]: [...tasks[todoListID].map(el =>
				el.id === taskId ? {...el, title: newTitle} : el
			)]
		})
	}

	const updateTodoList = (todoListID: string, newTitle: string) => {
		setTodolists(todolists.map(el =>
			el.id === todoListID ? {...el, title: newTitle} : el
		))
	}

	const removeTodoList = (todoListID: string) => {
		setTodolists(todolists.filter(el => el.id !== todoListID))
		delete tasks[todoListID]
	}

	function removeTask(todoListID: string, taskId: string) {
		// let filteredTasks = tasks.filter(t => t.id != id);
		// setTasks(filteredTasks);
		setTasks({
			...tasks, [todoListID]: tasks[todoListID].filter(el => {
				return el.id !== taskId
			})
		})
	}

	function addTask(todoListID: string, title: string) {
		let newTask = {id: v1(), title: title, isDone: false};
		// let newTasks = [task, ...tasks];
		// setTasks(newTasks);

		setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
	}

	const addTodoList = (title: string) => {
		const newID = v1()
		const newTodo: TodolistsType = {id: newID, title: title, filter: "all"}
		setTodolists([...todolists, newTodo])
		setTasks({[newID]: [], ...tasks})
	}

	function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
		// let task = tasks.find(t => t.id === taskId);
		// if (task) {
		// 	task.isDone = isDone;
		// }
		//
		// setTasks([...tasks]);
		setTasks({
			...tasks, [todoListID]: tasks[todoListID].map(el => {
				return el.id === taskId ? {...el, isDone} : el
			})
		})
	}

	function changeFilter(todoListID: string, value: FilterValuesType) {
		setTodolists(todolists.map(el => {
			return el.id === todoListID ? {...el, filter: value} : el
		}))
	}

	return (
		<div className="App">
			<ButtonAppBar/>
			<Container fixed>
				<Grid container style={{padding: "20px"}} >
					<Input callback={addTodoList}/>
				</Grid>

				<Grid container spacing={3}>
					{todolists.map(el => {

						let tasksForTodolist = tasks[el.id]

						if (el.filter === "active") {
							tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
						}
						if (el.filter === "completed") {
							tasksForTodolist = tasks[el.id].filter(t => t.isDone);
						}

						return (

							<Grid item key={el.id}>
								<Paper style={{padding: "10px"}}>
									<Todolist
										// key={el.id}
										todoListID={el.id}
										title={el.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={el.filter}
										removeTodoList={removeTodoList}
										updateTask={updateTask}
										updateTodoList={updateTodoList}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	);
}

export default App;
