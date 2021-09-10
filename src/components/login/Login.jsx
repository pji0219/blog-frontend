import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login({ onChange, onSubmit, value }) {
  const {email, password} = value;

  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmit} className={styles.login_container}>
        <div className={styles.title}>
          <span>로그인</span>
        </div>
        <div className={styles.input_container}>
          <input type="email" name="email" value={email || ''} placeholder="아이디(이메일)" onChange={onChange} />
          <input type="password" name="password" value={password || ''} placeholder="비밀번호" onChange={onChange} />
        </div>
        <div className={styles.btn_container}>
          <button type="submit">로그인</button>
          <Link to="/register">계정 만들기</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;