import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
	switch (action.type) {
		case 'REMOVE-TASK' :
			return {
				...state,
				[action.todoListId]: state[action.todoListId]
					.filter(t => t.id !== action.taskId)
			}
		case 'ADD-TASK' :
			return {
				...state,
				[action.todoListId]: [{id: v1(), title: action.title, isDone: false},
					...state[action.todoListId]]
			}
		default:
			throw new Error('I don not understand this type')
	}
}

export const removeTaskAC = (taskId: string, todoListId: string) => {
	return {type: 'REMOVE-TASK', taskId, todoListId} as const
}

export const addTaskAC = (title: string, todoListId: string) => {
	return {type: "ADD-TASK", title, todoListId} as const
}
