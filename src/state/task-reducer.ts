import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskActionType
| ChangeTaskTitleActionType
| AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TASK' :
			return {
				...state,
				[action.todolistId]: state[action.todolistId]
					.filter(t => t.id !== action.taskId)
			}
		case 'ADD-TASK' :
			return {
				...state,
				[action.todolistId]: [{id: v1(), title: action.title, isDone: false},
					...state[action.todolistId]]
			}
		case 'CHANGE-TASK' :
			return {
				...state,
				[action.todoListId]: state[action.todoListId]
					.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
			}
		case 'CHANGE-TASK-TITLE' :
			return {
				...state,
				[action.todolistId]: state[action.todolistId]
					.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
			}
		case 'ADD-TODOLIST' :
			return {
				...state,
				[action.todolistId]: []
			}
		default:
			throw new Error('I don not understand this type')
	}
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
	return {type: "ADD-TASK", title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => {
	return {type: 'CHANGE-TASK', taskId, isDone, todoListId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
	return {type : 'CHANGE-TASK-TITLE', taskId, title, todolistId} as const
}
