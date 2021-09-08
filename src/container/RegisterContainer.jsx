import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Register from '../components/register/Register';
import { register } from '../redux-module/auth';

function RegisterContainer() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    repassword: '',
    nickname: ''
  });
  const {email, password, repassword, nickname} = form;

  const dispatch = useDispatch;

  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
      ...form,
      [name] : value
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    const user = {email, password, repassword, nickname}

    dispatch(register(user));
  }

  return (
    <>
      <Register onChange={onChange} onSubmit={onSubmit} value={form} />
    </>
  );
}

export default RegisterContainer;