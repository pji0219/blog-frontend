import React from 'react';
import styles from './Register.module.css';

function Register({ onChange, onSubmit, value }) {
  const {email, password, repassword, nickname} = value;

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
          <button>취소</button>
        </div>
      </form>
    </div>
  );
}

export default Register;