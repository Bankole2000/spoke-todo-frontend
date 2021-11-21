import { all } from "@redux-saga/core/effects";
import todoSaga from "./todoSaga";

export default function* rootSaga(){
  yield all(
    [
      todoSaga()
    ]
  )
}