import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux-module/auth';
import Login from '../components/login/Login';

function LoginContainer() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const {email, password} = form;

  const dispatch = useDispatch();

  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
      [name] : value
    });
  }

  const onSubmit = event => {
    event.preventDefault();
    const user = {email, password}

    dispatch(login(user));
  }

  return (
    <>
      <Login onChange={onChange} onSubmit={onSubmit} value={form} />
    </>
  );
}

export default LoginContainer;