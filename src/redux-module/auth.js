import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// 타입
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
const REGISTER_REQUEST_ERORR = 'REGISTER_REQUEST_ERROR';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
const LOGIN_REQUEST_ERORR = 'LOGIN_REQUEST_ERORR';

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

// 사가
// 회원가입
const registerUserAPI = (req) => {
  const config = {
    Headers: {
      'content-Type': 'application/json'
    }
  }
  
  return axios.post('api/user', req, config);
}

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);
    yield put({
      type: REGISTER_REQUEST_SUCCESS,
      payload: result.data
    });
  } catch(err) {
    yield put({
      type: REGISTER_REQUEST_ERORR,
      payload: err.response
    })
  }
}

export function* registerUserSaga() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// 로그인
const loginUserAPI = req => {
  const config = {
    Headers: {
      'content-Type': 'application/json'
    }
  }
  
  return axios.post('api/user', req, config);
}

function* logingUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);
    yield put({
      type: LOGIN_REQUEST_SUCCESS,
      payload: result.data
    });
  } catch(err) {
    yield put({
      type: LOGIN_REQUEST_ERORR,
      payload: err.response
    });
  }
}

export function* loginUserSaga() {
  yield takeEvery(LOGIN_REQUEST, logingUser);
}

// 리듀서
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  nickname: null,
  email: null,
  password: null,
  repassword: null,
  errorMsg: ''
}

export default function authReducer(state = initialState, action) {
  switch(action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return {
        ...state
      }
    case REGISTER_REQUEST_SUCCESS:
    case LOGIN_REQUEST_SUCCESS:
      localStorage.getItem('token', action.payload.token);
      return {
        ...state,
        nickname: action.payload.nickname,
        email: action.payload.email,
        password: action.payload.password,
        repassword: action.payload.repassword,
        isAuthenticated: true
      }
    case REGISTER_REQUEST_ERORR:
    case LOGIN_REQUEST_ERORR:
      localStorage.removeItem('token');
      return {
        ...state,
        // ...action.payload,
        token: null,
        isAuthenticated: false,
        nickname: null,
        email: null,
        password: null,
        repassword: null,
        errorMsg: action.payload.data.msg
      }
    default:
      return state;
  }
}