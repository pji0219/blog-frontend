import React from 'react';

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  // 총 포스트 수를 페이지 당 포스트 수로 나누어서 구해진 값이 페이지 수
  // 그 값까지 반복해서 페이지 수 만큼 배열에 순서대로 담음
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.Pagination}>
      
    </ul>
  );
}

export default Pagination;