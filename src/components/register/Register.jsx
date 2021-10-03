import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

function Register({ submit }) {
  const [user, setUser] = useState({
    user_id: '',
    user_pwd: '',
    user_name: ''
  });
  const {user_id, user_pwd, user_name} = user;
  
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
      user_id: '',
      user_pwd: '',
      user_name: ''
    });
  }
  
  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmit} className={styles.register_container}>
        <div className={styles.title}>
          <span>계정 만들기</span>
        </div>
        <div className={styles.input_container}>
          <input type="email" value={user_id || ''} name="user_id" placeholder="아이디(이메일)" onChange={onChange} />
          <input type="password" value={user_pwd || ''} name="user_pwd" placeholder="비밀번호" onChange={onChange} />
          <input type="text" value={user_name || ''} name="user_name" placeholder="닉네임" onChange={onChange} />
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