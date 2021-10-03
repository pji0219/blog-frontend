import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../loading-spinner/Loading';
import styles from './PostDetail.module.css';
import { FaMouse, FaCommentDots, FaPenAlt } from "react-icons/fa";

function PostDetail({ postDetail, userName, loading }) {

  const onDelete = () => {
    // postDelete();
    return;
  }

  // JSX
  const EditButton = (
    <div className={styles.btn_container}>
      <Link to="/">
        <button className={styles.home_btn}>
          홈
        </button>
      </Link>
    
      <Link to="#">
        <button className={styles.edit_btn}>
          수정
        </button>
      </Link>
      
      <button className={styles.delete_btn} onClick={onDelete}>
        삭제
      </button>
    </div>
  )

  const HomeButton = (
    <div className={styles.btn_container}>
      <button className={styles.home_btn}>
        <Link to="/">
          홈
        </Link>
      </button>
    </div>
  )
  
  /* 
    데이터에 있는 작성자를 가져오기 위함 
    ( postDetail[0].content으로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
    ( JSX에 있는 map함수를 이용해서 데이터 값을 받아오는 것들도 마찬가지 이유로 사용 )
  */
  const content = postDetail.map(post => (
    post.content
  ));
  
  /* 
    데이터에 있는 작성자를 가져오기 위함 
    ( postDetail[0].user_name으로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
    ( JSX에 있는 map함수를 이용해서 데이터 값을 받아오는 것들도 마찬가지 이유로 사용 )
  */
  const creatorId = postDetail.map(post => (
    post.user_name
  ));
  
  const Body = (
    <>
      {creatorId[0] === userName ? EditButton : HomeButton}
      <div className={styles.title_container}>
        <span className={styles.title}>
          제목:
          &nbsp;
          {
            postDetail.map(post => (
              post.post_title
            ))
          }
        </span>
        <span className={styles.creator}>
          작성자:
          &nbsp;
          {
            postDetail.map(post => (
              post.user_name
            ))
          }
        </span>
      </div>
      <div className={styles.info_container}>
        <FaPenAlt />
        &nbsp;
        <span>
          {postDetail.map(post => (
            post.post_Date
          ))}
        </span>
        &nbsp;&nbsp;
        <FaCommentDots />
        &nbsp;
        <span>
          {
            postDetail.map(post => (
              post.Comment.length
            ))
          }
        </span>
        &nbsp;&nbsp;
        <FaMouse />
        <span className={styles.views}>
          {postDetail.map(post => (
            post.post_see
          ))}
        </span>
      </div>
      <div className={styles.contents_container}>
        <textarea defaultValue={content[0]} readOnly />
      </div>
    </>
  )
  
  return (
    <div className={styles.post_page_container}>
      {loading ? <Loading /> : Body}
    </div>
  );
}

export default PostDetail;