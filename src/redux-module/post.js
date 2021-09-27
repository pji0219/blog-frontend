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

// 액션 생성 함수
// 모든 포스트 호출
// export const getPosts = () => ({ type: GET_POSTS_REQUEST });

// 포스트 업로드
export const uploadPost = body => (
  {
    type: POST_UPLOADING_REQUEST,
    payload: body
  }
)

// 사가
// 모든 포스트 호출
// const PostsAPI = async () => {
//   const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/article`);
//   return res;
// }

// function* getPostsSaga() {
//   try {
//     const posts = yield call(PostsAPI);
//     yield put({
//       type: GET_POSTS_SUCCESS,
//       payload: posts.data.results
//     });
//   } catch (err) {
//     yield put({
//       type: GET_POSTS_ERROR,
//       payload: err,
//       error: true
//     });
//   }
// }

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
  // yield takeEvery(GET_POSTS_REQUEST, getPostsSaga);
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPostSaga);
}

// 리듀서
// const initialState = {
//   loading: false,
//   data: [],
//   error: null
// };

// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case GET_POSTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         data: null,
//         error: null
//       };
//     case GET_POSTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: null
//       };
//     case GET_POSTS_ERROR:
//       return {
//         ...state,
//         loading: false,
//         data: null,
//         error: action.error
//       };
//     default:
//       return state;
//   }
// }