import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import { postsSaga } from "./post";
import authReducer, { authSaga } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga()
  ]);
}

export default rootReducer;