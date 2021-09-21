import { takeEvery, put, call } from "redux-saga/effects";
import * as API from '../components/post-list/PostData';
import axios from "axios";

// 액션 타입
// 모든 포스트 호출
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

// 포스트 업로드
export const POST_UPLOADING_REQUEST = "POST_UPLOADING_REQUEST";
export const POST_UPLOADING_SUCCESS = "POST_UPLOADING_SUCCESS";
export const POST_UPLOADING_ERROR = "POST_UPLOADING_ERROR";

// 액션 생성 함수
// 모든 포스트 호출
export const getPosts = () => ({ type: GET_POSTS });

// 포스트 업로드
export const uploadPost = body => (
  {
    type: POST_UPLOADING_REQUEST,
    payload: body
  }
)

// 사가
// 모든 포스트 호출
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

// 포스트 업로드
const uploadPostAPI = payload => {
  const config = {
    Headers: {
      'content-Type': 'application/json'
    }
  }

  const token = payload.token;
  if(token) {
    config.Headers["x-auth-token"] = token;
  }

  return axios.post('/api/post', payload, config);
}

function* uploadPosts(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    yield put ({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data
    });
    // yield put(push(`/post/${result.data._id}`));
  } catch(err) {
    yield put({
      type: POST_UPLOADING_ERROR,
      payload: err
    });
    // yield push('/');
  }
}

export function* uploadPostSaga() {
  yield takeEvery(POST_UPLOADING_REQUEST,  uploadPosts);
}

// 리듀서
const initialState = {
  posts: {
    loading: false,
    data: [],
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