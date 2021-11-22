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
};

export default function todos(state = initialState, action: Action) {
  console.log({ action })
  switch (action.type) {
    case ActionType.GET_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
        message: "Loading Todos",
        messageType: "info"
      }
    case ActionType.GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
        message: action.message,
      }
    case ActionType.GET_TODO_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        message: action.message,
      }
    case ActionType.CREATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        message: "Creating Todo Item",
        messageType: "info"
      };
    case ActionType.CREATE_TODO_SUCCESS:
      console.log(action)
      // state.todos.push(action.payload);
      console.log({ state, newTodo: action.payload })
      return {
        ...state,
        todos: [
          action.payload,
          ...state.todos,
        ],
        loading: false,
        message: action.message,
        messageType: "success"
      }
    case ActionType.UPDATE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        message: "Updating Todo",
        messageType: 'info',
      }
    case ActionType.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id == action.payload.id) {
            return action.payload
          } else {
            return todo;
          }
        }),
        loading: false,
        message: action.message,
        messageType: 'success'
      }
    case ActionType.DELETE_TODO_REQUEST:
      return {
        ...state,
        loading: true,
        message: 'deleting todo item',
        messageType: 'info'
      }
    case ActionType.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id != action.payload),
        loading: false,
        message: action.message,
        messageType: 'success'
      }
    default:
      return state;
  }
}

