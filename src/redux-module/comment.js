import axios from "axios";
import { put, takeEvery, all, call } from 'redux-saga/effects';

// 타입
// 댓글 로딩
export const COMMENT_LOADING_REQUEST = "COMMENT_LOADING_REQUEST";
export const COMMENT_LOADING_SUCCESS = "COMMENT_LOADING_SUCCESS";
export const COMMENT_LOADING_ERROR = "COMMENT_LOADING_ERROR";

// 댓글 업로드
export const COMMENT_UPLOADING_REQUEST = "COMMENT_UPLOADING_REQUEST";
export const COMMENT_UPLOADING_SUCCESS = "COMMENT_UPLOADING_SUCCESS";
export const COMMENT_UPLOADING_ERROR = "COMMENT_UPLOADING_ERROR";

// 액션 생성 함수
// 댓글 로딩
export const loadComments = id => ({
  type: COMMENT_LOADING_REQUEST,
  payload: id
});

export const uploadComments = body => ({
  type: COMMENT_UPLOADING_REQUEST,
  payload: body
});

// 사가
// 댓글 로드
const loadCommentsAPI = id => {
  console.log(id, '댓글 로드API ID');
  return axios.get(`${process.env.REACT_APP_SERVER_URL}/comment?articles_idx=${id}`);
}

function* loadCommentsSaga(action) {
  try {
    const res = yield call(loadCommentsAPI, action.payload);
    console.log(res, '댓글 결과');
    
    yield put({
      type: COMMENT_LOADING_SUCCESS,
      payload: res.data.results
    });
  } catch(err) {

    console.log(err);

    yield put({
      type: COMMENT_LOADING_ERROR,
      payload: err
    });

    yield put(alert('error!'));
  }
}

// 댓글 업로드
const uploadCommentsAPI = payload => {
  console.log(payload, '댓글 업로드 API');
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/comment`, payload);
}

function* uploadCommentsSaga(action) {
  try {
    const result = yield call(uploadCommentsAPI, action.payload);
    console.log(result, '댓글 업로드');
    
    yield put({
      type: COMMENT_UPLOADING_SUCCESS,
      payload: result.data.commentResult
    });
  } catch(err) {

    console.log(err);

    yield put({
      type: COMMENT_UPLOADING_ERROR,
      payload: err
    });

    yield put(alert('error!'));
  }
}

export function* commentsSaga() {
  yield all([
    takeEvery(COMMENT_LOADING_REQUEST, loadCommentsSaga),
    takeEvery(COMMENT_UPLOADING_REQUEST, uploadCommentsSaga),
  ]);
}

// 리듀서
const initialState = {
  comments: [],
  creatorId: '',
  loading: false,
  isAuthenticated: false
}

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENT_LOADING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COMMENT_LOADING_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      }
    case COMMENT_LOADING_ERROR:
      return {
        ...state,
        loading: false
      }
    case COMMENT_UPLOADING_REQUEST:
      return {
        ...state,
        loading: true
      }
    case COMMENT_UPLOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      }
    case COMMENT_UPLOADING_ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}