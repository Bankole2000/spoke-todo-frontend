import { call, put, takeEvery } from "redux-saga/effects";
import { Todo } from "../../interfaces/TodoInterface";
import config from '../../utils/config';
import { CREATE_TODO, GET_TODO, GET_TODOS, UPDATE_TODO, DELETE_TODO, DELETE_TODOS } from "../action-types";
const apiUrl = `${config.baseUrl}/api/todos`

function getAll() {
  return fetch(apiUrl, {
    method: "GET",
    headers: {
      contentType: "application/json"
    }
  })
    .then(res => res.json())
    .catch(e => { throw e })
}

function getSingle(id: number | string) {
  return fetch(`${apiUrl}/${id}`, {
    method: "GET",
    headers: {
      contentType: "application/json"
    }
  })
    .then(res => res.json())
    .catch(e => { throw e })
}

function create(todo: Todo) {
  return fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
    .catch(e => { throw e })
}

function update(todo: Todo) {
  return fetch(`${apiUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
    .then(res => res.json())
    .catch(e => { throw e })
}

function deleteSingle(id: number | string) {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      contentType: "application/json"
    }
  })
    .then(res => res.json())
    .catch(e => { throw e })
}

function deleteAll() {
  return fetch(apiUrl, {
    method: "DELETE",
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then(res => res.json())
    .catch(e => { throw e })
}

function* getTodos(action: GET_TODOS) {
  console.log({ action })
  try {
    const { message, success, errors, data } = yield call(getAll)
    if (!success) {
      yield put({ type: 'GET_TODOS_FAILED', message, error: errors })
      return;
    }
    console.log({ data });
    yield put({ type: 'GET_TODOS_SUCCESS', todos: data, message })
  } catch (error: any) {
    yield put({ type: 'GET_TODOS_FAILED', message: error.message, error: ['Failed to fetch todos'] })
  }
}

function* getTodoDetails(action: GET_TODO) {
  console.log({ action })
  try {
    const request = getSingle(action.payload)
    const { message, success, errors, data } = yield request
    if (!success) {
      yield put({ type: 'GET_TODO_FAILED', message, error: errors })
      return
    }
    yield put({ type: 'GET_TODO_SUCCESS', todos: data, message })
  } catch (error: any) {
    yield put({ type: 'GET_TODO_FAILED', message: error.message, error: ["Couldn't get todo item details"] })
  }
}

function* createTodo(action: CREATE_TODO) {
  console.log({ action, payload: action.payload })
  try {
    const request = create(action.payload)
    const { message, success, errors, data } = yield request
    if (!success) {
      yield put({ type: 'CREATE_TODO_FAILED', message, error: errors })
      return;
    }
    yield put({ type: 'CREATE_TODO_SUCCESS', payload: data, message })
  } catch (error: any) {
    yield put({ type: 'CREATE_TODO_FAILED', message: error.message, error: ["Error creating todo item"] })
  }
}

function* updateTodo(action: UPDATE_TODO) {
  console.log({ action, payload: action.payload })
  try {
    const request = update(action.payload)
    const { message, success, errors, data } = yield request
    if (!success) {
      yield put({ type: 'UPDATE_TODO_FAILED', message, error: errors })
      return;
    }
    yield put({ type: 'UPDATE_TODO_SUCCESS', payload: data, message })
  } catch (error: any) {
    yield put({ type: 'UPDATE_TODO_FAILED', message: error.message, error: ["Error updating Todo item"] })
  }
}

function* deleteTodo(action: DELETE_TODO) {
  console.log({ action, payload: action.payload })
  try {
    const request = deleteSingle(action.payload)
    const { message, success, errors, data } = yield request
    if (!success) {
      yield put({ type: 'DELETE_TODO_FAILED', message, error: errors })
      return;
    }
    yield put({ type: 'DELETE_TODO_SUCCESS', payload: data, message })
  } catch (error: any) {
    yield put({ type: 'DELETE_TODO_FAILED', message: error.message, error: ["Error deleting todo item"] })
  }
}

function* deleteAllTodos(action: DELETE_TODOS) {
  console.log({ action, payload: action.payload })
  try {
    const request = deleteAll()
    const { message, success, errors, data } = yield request
    if (!success) {
      yield put({ type: 'DELETE_TODOS_FAILED', message, error: errors })
      return;
    }
    yield put({ type: 'DELETE_TODOS_SUCCESS', payload: data, message })
  } catch (error: any) {
    yield put({ type: 'DELETE_TODOS_FAILED', message: error.message, error: ["Error deleting todo item"] })
  }
}

function* todoSaga() {
  yield takeEvery('GET_TODOS_REQUEST', getTodos)
  yield takeEvery('GET_TODO_REQUEST', getTodoDetails)
  yield takeEvery('CREATE_TODO_REQUEST', createTodo)
  yield takeEvery('UPDATE_TODO_REQUEST', updateTodo)
  yield takeEvery('DELETE_TODO_REQUEST', deleteTodo)
  yield takeEvery('DELETE_TODOS_REQUEST', deleteAllTodos)
  // yield takeEvery('DELETE_TODOS_REQUEST', getTodos)
}

export default todoSaga