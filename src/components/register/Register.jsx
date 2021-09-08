import React from 'react';
import styles from './Register.module.css';

function Register({ onChange, onSubmit, value }) {
  const {email, password, repassword, nickname} = value;

  return (
    <div className={styles.form_container}>
      <form onSubmit={onSubmit} className={styles.container}>
        <input type="email" value={email || ''} name="email" placeholder="아이디(이메일)" onChange={onChange} />
        <input type="password" value={password || ''} name="password" placeholder="비밀번호" onChange={onChange} />
        <input type="password" value={repassword || ''} name="repassword" placeholder="비밀번호 확인" onChange={onChange} />
        <input type="text" value={nickname || ''} name="nickname" placeholder="닉네임" onChange={onChange} />
      </form>
    </div>
  );
}

export default Register;