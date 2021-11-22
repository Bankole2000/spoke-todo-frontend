import { createStore, applyMiddleware } from "redux";
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