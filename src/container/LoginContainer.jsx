import React, { useState } from 'react';
import { login } from '../redux-module/auth';
import { useDispatch } from 'react-redux';
import Login from '../components/login/Login';
import axios from 'axios';

function LoginContainer() {
  const dispatch = useDispatch();

  const submit = user => {
    axios({
      method: 'POST',
      url: 'http://15.164.229.13/users/signin',
      data: user
    })
    .then(res => {
      dispatch(login(res.data.result));
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Login submit={submit} />
    </>
  );
}

export default LoginContainer;