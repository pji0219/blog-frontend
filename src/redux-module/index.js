import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import posts, { postsSaga } from "./post";
import authReducer, { registerUserSaga } from "./auth";

const rootReducer = combineReducers({
  posts,
  auth: authReducer
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    registerUserSaga()
  ]);
}

export default rootReducer;