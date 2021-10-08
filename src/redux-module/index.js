import { combineReducers } from "redux";
import { all } from 'redux-saga/effects';
import postReducer, { postsSaga } from "./post";
import authReducer, { authSaga } from "./auth";
import commentsReducer, { commentsSaga } from "./comment";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  comments: commentsReducer
});

export function* rootSaga() {
  yield all([
    postsSaga(),
    authSaga(),
    commentsSaga()
  ]);
}

export default rootReducer;