import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from './reducers/index'
import rootSaga from './sagas/index';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return {
      ...createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))),
      runSaga: sagaMiddleware.run(rootSaga),
  };
};

export default configureStore;

// const sagaMiddleware = createSagaMiddleware()

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = compose(
//   applyMiddleware(sagaMiddleware),
// )(createStore)(rootReducers, composeEnhancers);

// sagaMiddleware.run(rootSaga)
// export default store;