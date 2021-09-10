import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register({ submit }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
    repassword: '',
    nickname: ''
  });
  const {email, password, repassword, nickname} = user;
  
  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setUser({
      ...user,
      [name] : value
    })
  }

  const onSubmit = event => {
    event.preventDefault();
    submit(user);
    setUser({
      email: '',
      password: '',
      repassword: '',
      nickname: ''
    });
  }
  
  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmit} className={styles.register_container}>
        <div className={styles.title}>
          <span>계정 만들기</span>
        </div>
        <div className={styles.input_container}>
          <input type="email" value={email || ''} name="email" placeholder="아이디(이메일)" onChange={onChange} />
          <input type="password" value={password || ''} name="password" placeholder="비밀번호" onChange={onChange} />
          <input type="password" value={repassword || ''} name="repassword" placeholder="비밀번호 확인" onChange={onChange} />
          <input type="text" value={nickname || ''} name="nickname" placeholder="닉네임" onChange={onChange} />
        </div>
        <div className={styles.btn_container}>
          <button type="submit">등록</button>
          <Link to="/login">취소</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;