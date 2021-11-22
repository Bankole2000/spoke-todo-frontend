import { Todo } from "../../interfaces/TodoInterface";

export enum ActionType {
  GET_TODOS_REQUEST = "GET_TODOS_REQUEST",
  GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS",
  GET_TODOS_FAILED = "GET_TODOS_FAILED",
  GET_TODO_REQUEST = "GET_TODO_REQUEST",
  GET_TODO_SUCCESS = "GET_TODO_SUCCESS",
  GET_TODO_FAILED = "GET_TODO_FAILED",
  CREATE_TODO_REQUEST = "CREATE_TODO_REQUEST",
  CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS",
  CREATE_TODO_FAILED = "CREATE_TODO_FAILED",
  UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST",
  UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_FAILED = "UPDATE_TODO_FAILED",
  DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST",
  DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS",
  DELETE_TODO_FAILED = "DELETE_TODO_FAILED",
  DELETE_TODOS_REQUEST = "DELETE_TODOS_REQUEST",
  DELETE_TODOS_SUCCESS = "DELETE_TODOS_SUCCESS",
  DELETE_TODOS_FAILED = "DELETE_TODOS_FAILED",
}

export enum MessageType {
  success = "success",
  warning = "warning",
  info = "info",
  error = "error",
  null = ""
}

export interface GET_TODOS {
  type: ActionType.GET_TODOS_REQUEST | ActionType.GET_TODOS_SUCCESS | ActionType.GET_TODOS_FAILED,
  message?: string,
  todos?: Todo[],
  error?: string[]
}

export interface GET_TODO {
  type: ActionType.GET_TODO_REQUEST | ActionType.GET_TODO_SUCCESS | ActionType.GET_TODO_FAILED,
  payload: number | string,
  error?: string[]
  message?: string
}

export interface CREATE_TODO {
  type: ActionType.CREATE_TODO_REQUEST | ActionType.CREATE_TODO_SUCCESS | ActionType.CREATE_TODO_FAILED,
  payload: Todo,
  error?: string[]
  message?: string
}

export interface UPDATE_TODO {
  type: ActionType.UPDATE_TODO_REQUEST | ActionType.UPDATE_TODO_SUCCESS | ActionType.UPDATE_TODO_FAILED,
  payload: Todo,
  error?: string[],
  message?: string
}

export interface DELETE_TODO {
  type: ActionType.DELETE_TODO_REQUEST | ActionType.DELETE_TODO_SUCCESS | ActionType.DELETE_TODO_FAILED,
  payload: number | string,
  error?: string[],
  message?: string
}

interface DELETE_TODOS {
  type: ActionType.DELETE_TODOS_REQUEST | ActionType.DELETE_TODOS_SUCCESS | ActionType.DELETE_TODOS_FAILED,
  payload?: number | string,
  error?: string[],
  message?: string
}

export type Action = GET_TODO | GET_TODOS | CREATE_TODO | UPDATE_TODO | DELETE_TODO | DELETE_TODOS;