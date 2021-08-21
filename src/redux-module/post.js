import { takeEvery, put, call } from "redux-saga/effects";
import * as API from '../components/post-list/PostData';

// 액션 타입
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

// 액션 생성 함수
export const getPosts = () => ({ type: GET_POSTS });

// 사가
function* getPostsSaga() {
  try {
    const posts = yield call(API.PostsAPI);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts
    });
  } catch (err) {
    yield put({
      type: GET_POSTS_ERROR,
      payload: err,
      error: true
    });
  }
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
}

// 리듀서
const initialState = {
  posts: {
    loading: false,
    data: null,
    error: null
  },
  post: {
    loading: false,
    data: null,
    error: null
  }
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null
        }
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.error
        }
      };
    default:
      return state;
  }
}