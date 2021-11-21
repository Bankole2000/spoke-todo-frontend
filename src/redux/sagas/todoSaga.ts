import { call, put, takeEvery } from "redux-saga/effects";
import { Todo } from "../../interfaces/TodoInterface";
import config from '../../utils/config';
import { Action, CREATE_TODO, GET_TODO, GET_TODOS } from "../action-types";
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

function update(id: number | string) {
  return fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    headers: {
      contentType: "application/json"
    }
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
    console.log({ data });
    yield put({ type: 'GET_TODOS_SUCCESS', todos: data, message })
  } catch (error: any) {
    yield put({ type: 'GET_TODOS_FAILED', message: error.message })
  }
}

function* getTodoDetails(action: GET_TODO) {
  console.log({ action })
  try {
    const request = getSingle(action.payload)
    const { message, success, errors, data } = yield request
    console.log({ data });
    yield put({ type: 'GET_TODO_SUCCESS', todos: data, message })
  } catch (error: any) {
    yield put({ type: 'GET_TODO_FAILED', message: error.message })
  }
}

function* createTodo(action: CREATE_TODO) {
  console.log({ action, payload: action.payload })
  try {
    const request = create(action.payload)
    const { message, success, errors, data } = yield request
    console.log({ data });
    yield put({ type: 'CREATE_TODO_SUCCESS', payload: data, message })
  } catch (error: any) {
    yield put({ type: 'CREATE_TODO_FAILED', message: error.message })
  }
}

function* todoSaga() {
  yield takeEvery('GET_TODOS_REQUEST', getTodos)
  yield takeEvery('GET_TODO_REQUEST', getTodoDetails)
  yield takeEvery('CREATE_TODO_REQUEST', createTodo)
  // yield takeEvery('UPDATE_TODO_REQUEST', getTodos)
  // yield takeEvery('DELETE_TODO_REQUEST', getTodos)
  // yield takeEvery('DELETE_TODOS_REQUEST', getTodos)
}

export default todoSaga