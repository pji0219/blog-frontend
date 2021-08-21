import React from 'react';
import styles from './Post.module.css';

function post({ post }) {
  const { title, desc } = post;

  return (
    <li className={styles.post}>
      <span>{title}</span>
      <p>{desc}</p>
    </li>
  );
}

export default post;