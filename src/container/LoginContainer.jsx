import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux-module/auth';
import Login from '../components/login/Login';

function LoginContainer() {
  const dispatch = useDispatch();

  const submit = user => dispatch(login(user));
 
  return (
    <>
      <Login submit={submit} />
    </>
  );
}

export default LoginContainer;