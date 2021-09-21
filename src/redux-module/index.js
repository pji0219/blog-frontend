import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import posts, { postsSaga, uploadPostSaga } from "./post";
import authReducer, { loginUserSaga, registerUserSaga } from "./auth";

const rootReducer = combineReducers({
  posts,
  auth: authReducer
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    registerUserSaga(),
    loginUserSaga(),
    uploadPostSaga()
  ]);
}

export default rootReducer;