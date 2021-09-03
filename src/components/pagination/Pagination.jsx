import React, { useState } from 'react';
import styles from './Pagination.css';
import { FaStepBackward, FaStepForward } from "react-icons/fa";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  // 총 포스트 수를 페이지 당 포스트 수로 나누어서 구해진 값이 페이지 수
  // 그 값까지 반복해서 페이지 수 만큼 배열에 순서대로 담음
  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // 이전 또는 다음 페이지로 넘어갈 때 +-5를 하기 위한 state
  const [pageNumberLimit] = useState(5);
  /*
    한번에 최대 몇 페이지까지 표시 될지 정함 (5페이지)
    그리고 다른 기능으로는 이전, 다음 페이지로 넘어갈때 나열될 
    페이지 숫자들을 바꾸기 위한 state
  */
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // 이전, 다음 페이지 버튼 기능 구현
  const prevBtn = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  }

  const nextBtn = () => {
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  }

  // 페이지 숫자 리스트
  const renderPageNumbers = pageNumbers.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li 
          key={number} 
          className={currentPage === number ? "active" : null} 
          onClick={() => {paginate(number)}} 
        >
          {number}
        </li>
      );
    }
    else {
      return null;
    }
  });

  return (
    <ul className="pagination">
      <div
        className="prev_btn"
        onClick={prevBtn}
      >
        <FaStepBackward />
      </div>
      {renderPageNumbers}
      <div
        className="next_btn"
        onClick={nextBtn}
      >
        <FaStepForward />
      </div>
    </ul>
  );
}

export default Pagination;