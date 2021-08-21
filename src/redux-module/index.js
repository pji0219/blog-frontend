import { combineReducers } from "redux";
import posts, { postsSaga } from "./post";
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  posts
});

export function* rootSaga() {
  yield all([
    postsSaga()
  ]);
}

export default rootReducer;