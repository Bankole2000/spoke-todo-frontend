import { Todo } from '../../interfaces/TodoInterface';
import { Action, ActionType, MessageType } from '../action-types/index';

interface TodoStateInterface {
  todos: Todo[],
  errors?: string[],
  loading?: boolean,
  message?: string,
  messageType?: MessageType
}

const initialState: TodoStateInterface = {
  todos: [],
  loading: false,
  errors: [],
  message: '',
  messageType: undefined,
};

export default function todos(state = initialState, action: Action) {

  switch (action.type) {
    case ActionType.GET_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
        message: "Loading Todos",
        messageType: undefined
      }
    case ActionType.GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
        errors: [],
        message: action.message,
        MessageType: 'success'
      }
    case ActionType.GET_TODOS_FAILED:
      return {
        ...state,
        errors: action.error,
        loading: false,
        message: action.message,
        messageType: "error"
      }
    case ActionType.CREATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
        message: "Creating Todo Item",
        messageType: undefined
      };
    case ActionType.CREATE_TODO_SUCCESS:

      return {
        ...state,
        todos: [
          action.payload,
          ...state.todos,
        ],
        loading: false,
        errors: [],
        message: action.message,
        messageType: "success"
      }
    case ActionType.CREATE_TODO_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
        errors: action.error,
        messageType: "error"
      }
    case ActionType.UPDATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
        message: "Updating Todo",
        messageType: 'info',
      }
    case ActionType.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload
          } else {
            return todo;
          }
        }),
        loading: false,
        errors: [],
        message: action.message,
        messageType: 'success'
      }
    case ActionType.UPDATE_TODO_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
        errors: action.error,
        messageType: "error"
      }
    case ActionType.DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        errors: [],
        message: 'deleting todo item',
        messageType: 'info'
      }
    case ActionType.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== +action.payload),
        loading: false,
        errors: [],
        message: action.message,
        messageType: 'success'
      }
    case ActionType.DELETE_TODO_FAILED:
      return {
        ...state,
        loading: false,
        message: action.message,
        errors: action.error,
        messageType: "error"
      }
    case ActionType.RESET_MESSAGE_TYPE:
      return {
        ...state,
        messageType: undefined
      }
    default:
      return state;
  }
}

