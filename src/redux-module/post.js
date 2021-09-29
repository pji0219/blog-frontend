import { takeEvery, put, call } from "redux-saga/effects";
// import * as API from '../components/post-list/PostData';
import axios from "axios";

// 액션 타입
// 모든 포스트 호출
// const GET_POSTS_REQUEST = 'GET_POSTS';
// const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
// const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

// 포스트 업로드
export const POST_UPLOADING_REQUEST = "POST_UPLOADING_REQUEST";
export const POST_UPLOADING_SUCCESS = "POST_UPLOADING_SUCCESS";
export const POST_UPLOADING_ERROR = "POST_UPLOADING_ERROR";

// 포스트 업로드
export const uploadPost = body => (
  {
    type: POST_UPLOADING_REQUEST,
    payload: body
  }
)

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

  return axios.post(`${process.env.REACT_APP_SERVER_URL}/article`, payload, config);
}

function* uploadPostSaga(action) {
  try {
    const result = yield call(uploadPostAPI, action.payload);
    yield put ({
      type: POST_UPLOADING_SUCCESS,
      payload: result
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

export function* postsSaga() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPostSaga);
}
