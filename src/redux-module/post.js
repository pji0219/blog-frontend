import { takeEvery, put, call, getContext } from "redux-saga/effects";
import axios from "axios";

// 액션 타입
// 포스트 업로드
export const POST_UPLOADING_REQUEST = "POST_UPLOADING_REQUEST";
export const POST_UPLOADING_SUCCESS = "POST_UPLOADING_SUCCESS";
export const POST_UPLOADING_ERROR = "POST_UPLOADING_ERROR";

// 포스트 디테일
export const POST_DETAIL_LOADING_REQUEST = "POST_DETAIL_LOADING_REQUEST";
export const POST_DETAIL_LOADING_SUCCESS = "POST_DETAIL_LOADING_SUCCESS";
export const POST_DETAIL_LOADING_ERROR = "POST_DETAIL_LOADING_ERROR";

// 액션 생성 함수
// 포스트 업로드
export const uploadPost = body => (
  {
    type: POST_UPLOADING_REQUEST,
    payload: body
  }
)

// 포스트 디테일
export const getPostDetail = data => (
  {
    type: POST_DETAIL_LOADING_REQUEST,
    payload: data
  }
)

//사가
// 포스트 업로드
const uploadPostAPI = req => {

  return axios.post(`${process.env.REACT_APP_SERVER_URL}/article`, req);
}

function* uploadPostSaga(action) {
  try {
    const res = yield call(uploadPostAPI, action.payload);
  
    yield put ({
      type: POST_UPLOADING_SUCCESS,
      payload: res.data.articleResult
    });

    yield put(alert('포스트 등록에 성공 하였습니다.'));
  } catch(err) {
    yield put({
      type: POST_UPLOADING_ERROR,
      payload: err
    });

    yield put(alert('error! 포스트 등록에 실패 하였습니다.'));
  }
}

// 포스트 디테일
const postDetailAPI = id => {
  console.log(id, '포스트 id');
  return axios.get(`${process.env.REACT_APP_SERVER_URL}/article/detail?articles_idx=${id}`);
}

function* postDetailSaga(action) {
  try {
    const res = yield call(postDetailAPI, action.payload);
    console.log(res, '포스트 디테일 사가');
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: res.data.results
    });
  } catch(err) {
    const history = yield getContext('history');

    yield put({
      type: POST_DETAIL_LOADING_ERROR,
      payload: err
    });

    yield put(history.push('/'));
  }
}

export function* postsSaga() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPostSaga);
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, postDetailSaga);
}

// 리듀서
const initialState = {
  postDetail: [],
  loading: false,
  error: null
}

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case POST_DETAIL_LOADING_REQUEST:
    return {
      ...state,
      loading: true
    }
    case POST_DETAIL_LOADING_SUCCESS: 
      return {
        ...state,
        postDetail: action.payload,
        loading: false
      }
    case POST_DETAIL_LOADING_ERROR:
      return {
        ...state,
        postDetail: [],
        error: action.payload,
        loading: false
      }
    default:
      return state;  
  }
}