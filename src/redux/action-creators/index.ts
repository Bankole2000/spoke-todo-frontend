import { Dispatch } from "redux"
import { Todo } from "../../interfaces/TodoInterface"

import { ActionType, Action } from "../action-types"

export const createTodo = (todo: Todo) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_TODO_REQUEST,
      payload: todo
    })
  }
}

// export const getAllTodos = () => {
//   console.log("here")
//   return (dispatch: Dispatch<Action>) => {
//     dispatch({
//       message: "",
//       payload: 
//       type: ActionType.GET_TODOS_REQUEST,
//     })
//   }
// }

// export const getSingleTodo = (id: number | string) => {
//   return (dispatch: Dispatch<Action>) => {
//     dispatch({
//       type: ActionType.GET_TODO_REQUEST,
//       payload: id
//     })
//   }
// }

export const updateTodo = (todo: Todo) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UPDATE_TODO_REQUEST,
      payload: todo
    })
  }
}

export const deleteSingleTodo = (id: string | number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETE_TODO_REQUEST,
      payload: id
    })
  }
}

export const deleteAllTodos = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETE_TODOS_REQUEST,
    })
  }
}