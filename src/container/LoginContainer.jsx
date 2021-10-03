import React from 'react';
import { login } from '../redux-module/auth';
import { useDispatch } from 'react-redux';
import Login from '../components/login/Login';
import axios from 'axios';

function LoginContainer() {
  const dispatch = useDispatch();

  const submit = user => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/users/signin`,
      data: user
    })
    .then(res => {
      dispatch(login(res.data.result));
    })
    .catch(err => {
      console.log(err)
    });
  }

  return (
    <>
      <Login submit={submit} />
    </>
  );
}

export default LoginContainer;