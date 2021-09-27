import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import { postsSaga } from "./post";
import authReducer, { loginUserSaga, registerUserSaga } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    registerUserSaga(),
    loginUserSaga()
  ]);
}

export default rootReducer;