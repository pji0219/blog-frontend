import React from 'react';
import styles from './Loading.module.css';

function loading() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading}></div>
    </div>
  );
}

export default loading;