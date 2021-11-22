import { Todo } from '../../interfaces/TodoInterface';
import { ActionType, CREATE_TODO, GET_TODO, UPDATE_TODO } from '../action-types/index';

export const getTodos = () => {
  return {
    type: ActionType.GET_TODOS_REQUEST,
  }
}

export const getSingleTodo = (id: number | string): GET_TODO => {
  return {
    type: ActionType.GET_TODO_REQUEST,
    payload: id
  }
}

export const createTodo = (todo: Todo): CREATE_TODO => {
  return {
    type: ActionType.CREATE_TODO_REQUEST,
    payload: todo
  }
}

export const updateTodo = (todo: Todo): UPDATE_TODO => {
  return {
    type: ActionType.UPDATE_TODO_REQUEST,
    payload: todo
  }
}

export const deleteTodo = (id: number | string | undefined) => {
  return {
    type: ActionType.DELETE_TODO_REQUEST,
    payload: id
  }
}