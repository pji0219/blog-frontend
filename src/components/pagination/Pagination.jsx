import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.css';

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  // 총 포스트 수를 페이지 당 포스트 수로 나누어서 구해진 값이 페이지 수
  // 그 값까지 반복해서 페이지 수 만큼 배열에 순서대로 담음
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map(number => (
        <li key={number} className={styles.page_item}>
          <Link className={currentPage === number ? styles.active : null} onClick={() => {paginate(number)}} to="#">
            {number}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;