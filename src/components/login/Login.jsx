import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ submit }) {
  const [user, setUser] = useState({
    user_id: '',
    user_pwd: ''
  });
  const {user_id, user_pwd} = user;

  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({
      ...user,
      [name] : value
    });
  }

  const onSubmit = event => {
    event.preventDefault();
    submit(user);
    setUser({
      user_id: '',
      user_pwd: ''
    });
  }


  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmit} className={styles.login_container}>
        <div className={styles.title}>
          <span>로그인</span>
        </div>
        <div className={styles.input_container}>
          <input type="email" name="user_id" value={user_id || ''} placeholder="아이디(이메일)" onChange={onChange} />
          <input type="password" name="user_pwd" value={user_pwd || ''} placeholder="비밀번호" onChange={onChange} />
        </div>
        <div className={styles.btn_container}>
          <button type="submit">로그인</button>
          <Link to="/">취소</Link>
          <Link to="/register">계정 만들기</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;