import React from 'react';
import js from './js.png';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';
import { FaMouse, FaThumbsUp } from "react-icons/fa";

function post({ title, contents, date, user, star, views, url }) {

  return (
    <Link to={`/post/${url}`}>
      <li className={styles.post_container}>
        <img className={styles.post_img} src={js} alt="img" />
        <h3 className={styles.post_title}>{title}</h3>
        <p className={styles.post_body}>{contents}</p>
        <div className={styles.post_date_container}>
          <span>{date}</span>
        </div>
        <div className={styles.post_views_container}>
          <FaMouse />
          &nbsp;
          <span>{views}</span>
        </div>
        <div className={styles.post_info_container}>
          <span className={styles.user}>{user}</span>
          &nbsp;&nbsp;
          <FaThumbsUp />
          &nbsp;
          <span className={styles.star}>{star}</span>
        </div>
      </li>
    </Link>
  );
}

export default post;