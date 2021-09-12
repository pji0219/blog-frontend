import React from 'react';
import { useDispatch } from 'react-redux';
import Register from '../components/register/Register';
import { register } from '../redux-module/auth';

function RegisterContainer() {
  const dispatch = useDispatch();

  const submit = user => dispatch(register(user));

  return (
    <>
      <Register submit={submit} />
    </>
  );
}

export default RegisterContainer;