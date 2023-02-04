import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodolistActionType
	| RemoveTodolistActionType

const REMOVE_TASK = "REMOVE-TASK"
const ADD_TASK = "ADD-TASK"
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"
const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE"

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
	switch (action.type) {
		case REMOVE_TASK :
			return {
				...state,
				[action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
			}

		case ADD_TASK :
			return {
				...state,
				[action.todoListId]:
					[{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
			}

		case CHANGE_TASK_STATUS:
			return {
				...state,
				[action.todoListId]: state[action.todoListId]
					.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
			}

		case CHANGE_TASK_TITLE:
			return {
				...state,
				[action.todoListId]: state[action.todoListId]
					.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
			}

		case 'ADD-TODOLIST':
			return {
				...state,
				[action.todolistId]: []
			}

		case 'REMOVE-TODOLIST': {
			const copyState = {...state}
			delete copyState[action.id]
			return copyState
		}

		default:
			return state
	}
}

export const removeTaskAC = (taskId: string, todoListId: string) => ({
	type: REMOVE_TASK, taskId, todoListId
} as const)

export const addTaskAC = (title: string, todoListId: string) => ({
	type: ADD_TASK, title, todoListId
} as const)

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
	type: CHANGE_TASK_STATUS, taskId, isDone, todoListId
} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
	type: CHANGE_TASK_TITLE, taskId, title, todoListId
} as const)
