import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import postReducer, { postsSaga } from "./post";
import authReducer, { authSaga } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga()
  ]);
}

export default rootReducer;