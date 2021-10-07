import { takeEvery, put, call, getContext } from "redux-saga/effects";
import axios from "axios";

// 액션 타입
// 포스트 업로드
const POST_UPLOADING_REQUEST = "POST_UPLOADING_REQUEST";
const POST_UPLOADING_SUCCESS = "POST_UPLOADING_SUCCESS";
const POST_UPLOADING_ERROR = "POST_UPLOADING_ERROR";

// 포스트 디테일
const POST_DETAIL_LOADING_REQUEST = "POST_DETAIL_LOADING_REQUEST";
const POST_DETAIL_LOADING_SUCCESS = "POST_DETAIL_LOADING_SUCCESS";
const POST_DETAIL_LOADING_ERROR = "POST_DETAIL_LOADING_ERROR";

// 포스트 수정 업로드
const POST_EDIT_UPLOADING_REQUEST = "POST_EDIT_UPLOADING_REQUEST";
const POST_EDIT_UPLOADING_SUCCESS = "POST_EDIT_UPLOADING_SUCCESS";
const POST_EDIT_UPLOADING_ERROR = "POST_EDIT_UPLOADING_ERROR";

// 포스트 삭제
export const POST_DELETE_REQUEST = "POST_DELETE_REQUEST";
const POST_DELETE_SUCCESS = "POST_DELETE_SUCCESS";
const POST_DELETE_ERROR = "POST_DELETE_ERROR ";

// 액션 생성 함수
// 포스트 업로드
export const uploadPost = body => (
  {
    type: POST_UPLOADING_REQUEST,
    payload: body
  }
)

// 포스트 디테일
export const getPostDetail = id => (
  {
    type: POST_DETAIL_LOADING_REQUEST,
    payload: id
  }
)

// 포스트 삭제
export const getPostDelete = id => (
  {
    type: POST_DELETE_REQUEST,
    payload: id
  }
)

// 포스트 수정 업로드
export const editPost = body => (
  {
    type: POST_EDIT_UPLOADING_REQUEST,
    payload: body
  }
)

//사가
// 포스트 업로드
const uploadPostAPI = body => {
  console.log(body, '바디2');
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/article`, body);
}

function* uploadPostSaga(action) {
  try {
    console.log(action.payload, '액션');
    const res = yield call(uploadPostAPI, action.payload);
    console.log(res, '응답');
    yield put ({
      type: POST_UPLOADING_SUCCESS,
      payload: res.data.articleResult
    });

    const history = yield getContext('history');
    yield put(history.push('/'));
  } catch(err) {

    yield put({
      type: POST_UPLOADING_ERROR,
      payload: err
    });

    const history = yield getContext('history');
    yield put(history.push('/'));
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

    yield put({
      type: POST_DETAIL_LOADING_ERROR,
      payload: err
    });

    yield put(alert('error! 포스트 상세페이지를 불러오는데 실패 하였습니다.'));
  }
}

// 포스트 수정 업로드
//에디트 컨테이너에서 axios로 api요청을 하고 결과 값을 디스패치 해서 사가로 전달하게 만듦
function* postEditSaga(action) {
  try {
    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: action.payload
    });

    const history = yield getContext('history');
    yield put(history.push('/'));

  } catch(err) {
    
    yield put({
      type: POST_EDIT_UPLOADING_ERROR,
      payload: err
    });
  }
}

// 포스트 삭제
const postDeleteAPI = id => {
  console.log(id, '포스트 삭제');
  return axios.delete(`${process.env.REACT_APP_SERVER_URL}/article?articles_idx=${id}`);
}

function* postDeleteSaga(action) {
  try {
    const res = yield call(postDeleteAPI, action.payload);
    console.log(res, '삭제 사가');

    yield put({
      type: POST_DELETE_SUCCESS,
      payload: res.data.result
    });

    const history = yield getContext('history');
    history.push('/');
  } catch(err) {

    yield put({
      type: POST_DELETE_ERROR,
      payload: err
    });

    const history = yield getContext('history');
    history.push('/');
  }

}

export function* postsSaga() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPostSaga);
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, postDetailSaga);
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, postEditSaga);
  yield takeEvery(POST_DELETE_REQUEST, postDeleteSaga);
}

// 리듀서
const initialState = {
  postDetail: [],
  loading: false,
  error: null
}

export default function postReducer(state = initialState, action) {
  switch(action.type) {
    case POST_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case POST_UPLOADING_SUCCESS: 
      return {
        ...state,
        loading: false
      }
    case POST_UPLOADING_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
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
      case POST_EDIT_UPLOADING_REQUEST:
        return {
          ...state,
          loading: true
        }
      case POST_EDIT_UPLOADING_SUCCESS: 
        return {
          ...state,
          loading: false
        }
      case POST_EDIT_UPLOADING_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        }
    default:
      return state;  
  }
}