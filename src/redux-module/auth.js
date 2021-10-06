import { call, put, takeEvery, getContext } from 'redux-saga/effects';
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
  return axios.post(`${process.env.REACT_APP_SERVER_URL}/users/signUp`, req);
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

    const history = yield getContext('history');

    history.push('/');
    
  } catch(err) {
    yield put({
      type: LOGIN_REQUEST_ERROR,
      payload: err.response
    });

    yield put(alert('error! 로그인에 실패하였습니다.'));
  }
}

// 로그아웃
function* logoutUser() {
  try {
    const history = yield getContext('history')

    yield put({
      type: LOGOUT_REQUEST_SUCCESS
    });
    
    history.push('/');
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
  userIdx: null,
  userId: null,
  userPwd: null,
  userName: null,
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
        userIdx: action.payload.user_idx,
        userId: action.payload.user_id,
        userName: action.payload.user_name,
        isAuthenticated: true
      }
    case REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      }
    case REGISTER_REQUEST_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        userIdx: null,
        userId: null,
        userPwd: null,
        userName: null,
        errorMsg: action.payload
      }
    case LOGIN_REQUEST_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        userIdx: null,
        userId: null,
        userPwd: null,
        userName: null,
        errorMsg: action.payload
      }
    case LOGOUT_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        userIdx: null,
        userId: null,
        userPwd: null,
        userName: null,
      }
    default:
      return state;
  }
}