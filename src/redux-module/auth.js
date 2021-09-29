import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// 타입
// 회원가입
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
const REGISTER_REQUEST_ERROR = 'REGISTER_REQUEST_ERROR';

// 로그인
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
const LOGIN_REQUEST_ERROR = 'LOGIN_REQUEST_ERROR';

// 로그아웃
const LOGOUT_REQUEST ='LOGOUT_REQUEST';
const LOGOUT_REQUEST_SUCCESS ='LOGOUT_REQUEST_SUCCESS';
const LOGOUT_REQUEST_ERROR ='LOGOUT_REQUEST_ERROR';

// 액션 생성함수
// 회원가입
export const register = user => ({
  type: REGISTER_REQUEST,
  payload: user
});

// 로그인
export const login = user => ({
  type: LOGIN_REQUEST,
  payload: user
});

// 로그아웃
export const logout = () => ({
  type: LOGOUT_REQUEST
});

// 사가
// 회원가입
const registerUserAPI = (req) => {
  const config = {
    Headers: {
      'content-Type': 'application/json'
    }
  }
  
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signUp`, req, config);
}

function* registerUser(action) {
  try {
    const res = yield call(registerUserAPI, action.payload);
    yield put({
      type: REGISTER_REQUEST_SUCCESS,
      payload: res.data
    });
  } catch(err) {
    yield put({
      type: REGISTER_REQUEST_ERROR,
      payload: err.response
    })
  }
}

// 로그인
function* logingUser(action) {
  try {
    yield put({
      type: LOGIN_REQUEST_SUCCESS,
      payload: action.payload
    });
  } catch(err) {
    yield put({
      type: LOGIN_REQUEST_ERROR,
      payload: err.response
    });
  }
}

// 로그아웃
function* logoutUser() {
  try {
    yield put({
      type: LOGOUT_REQUEST_SUCCESS
    });
  } catch(err) {
   yield put({
    type: LOGOUT_REQUEST_ERROR,
    payload: err.response
   });
  }
}

export function* authSaga() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
  yield takeEvery(LOGIN_REQUEST, logingUser);
  yield takeEvery(LOGOUT_REQUEST, logoutUser)
}

// 리듀서
const initialState = {
  isAuthenticated: false,
  user_idx: null,
  user_id: null,
  user_pwd: null,
  user_name: null,
  errorMsg: ''
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state
      }
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        user_idx: action.payload.user_idx,
        user_id: action.payload.user_id,
        user_name: action.payload.user_name,
        isAuthenticated: true
      }
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        user_id: action.payload.user_id,
        user_pwd: action.payload.user_pwd,
        user_name: action.payload.user_name,
        isAuthenticated: false
      }
    case REGISTER_REQUEST_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user_idx: null,
        user_id: null,
        user_pwd: null,
        user_name: null,
        errorMsg: action.payload
      }
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user_idx: null,
        user_id: null,
        user_pwd: null,
        user_name: null,
        errorMsg: action.payload
      }
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user_idx: null,
        user_id: null,
        user_pwd: null,
        user_name: null,
      }
    default:
      return state;
  }
}