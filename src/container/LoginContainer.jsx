import React from 'react';
// import { login } from '../redux-module/auth';
// import { useDispatch } from 'react-redux';
import Login from '../components/login/Login';
import axios from 'axios';

function LoginContainer() {

  const submit = user => {
    axios({
      method: 'POST',
      url: 'http://15.164.229.13/users/signin',
      data: user
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  // const dispatch = useDispatch();
  // const submit = user => dispatch(login(user));
 
  return (
    <>
      <Login submit={submit} />
    </>
  );
}

export default LoginContainer;