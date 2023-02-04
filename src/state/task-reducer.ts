import {TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

const REMOVE_TASK = "REMOVE-TASK"
const ADD_TASK = "ADD-TASK"
const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS"

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
