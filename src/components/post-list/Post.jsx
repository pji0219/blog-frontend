import React from 'react';
import js from './js.png';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';

function post({ title, contents, date, user, comments, views }) {

  return (
    <Link to="#">
      <li className={styles.post_container}>
        <img className={styles.post_img} src={js} alt="img" />
        <h3 className={styles.post_title}>{title}</h3>
        <p className={styles.post_body}>{contents}</p>
        <div className={styles.post_date_container}>
          <span>{date}</span>
        </div>
        <div className={styles.post_views_container}>
          <span>조회수 {views}</span>
        </div>
        <div className={styles.post_info_container}>
          <span className={styles.user}>{user}</span>
          <span className={styles.comments}>댓글 {comments}</span>
        </div>
      </li>
    </Link>
  );
}

export default post;