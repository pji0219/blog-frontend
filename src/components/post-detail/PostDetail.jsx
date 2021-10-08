import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import CKEditor from '@ckeditor/ckeditor5-react';
// import BallonEditor from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
// import { editorConfiguration } from '../../editor/EditorConfig';
// import Myinit from '../../editor/UploadAdapter';
import Loading from '../loading-spinner/Loading';
import styles from './PostDetail.module.css';
import { FaMouse, FaCommentDots, FaPenAlt } from "react-icons/fa";

function PostDetail({ 
  postDetail, 
  userName, 
  loading, 
  postId, 
  postDelete,
  comments,
  uploadComment,
  userIdx,
  auth
}) {
  const [form, setForm] = useState({
    post_comment: ''
  });
  const { post_comment } = form;

  // useEffect(() => {
  //   setForm({
  //     article_idx: postId,
  //     user_idx: userIdx
  //   });
  // }, [postId, userIdx])

  const onDelete = () => {
    postDelete();
  }

  const onChange = event => {
    const value = event.target.value;
    
    setForm({
      ...form,
      post_comment: value
    });
  }

  const onSubmit = async event => {
    await event.preventDefault();

    const body = {
      post_comment,
      article_idx: postId,
      user_idx: userIdx
    }

    uploadComment(body);

    setForm({
      post_comment: ''
    });
  }

  // JSX
  const EditButton = (
    <div className={styles.btn_container}>
      <Link to="/">
        <button className={styles.home_btn}>
          홈
        </button>
      </Link>
    
      <Link to={`/postedit/${postId}/edit`}>
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
    데이터에 있는 콘텐츠를 가져오기 위함 
    ( postDetail[0].content으로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
    ( JSX에 있는 map함수를 이용해서 데이터 값을 받아오는 것들도 마찬가지 이유로 사용 )
  */
  const content = postDetail.map(post => (
    post.content
  ));
  // const [contentData] = content;
  
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
        <span className={styles.date}>
          {postDetail.map(post => (
            post.post_Date
          ))}
        </span>
        &nbsp;&nbsp;
        <FaCommentDots />
        &nbsp;
        <span className={styles.comment}>
          {comments.length}
        </span>
        &nbsp;&nbsp;
        <FaMouse />
        <span className={styles.views}>
          {postDetail.map(post => (
            post.post_see
          ))}
        </span>
      </div>
      {/* <div className={styles.content_container}>
        <CKEditor 
          editor={BallonEditor}
          config={editorConfiguration}
          disabled="true"
        />
      </div> */}
      <div className={styles.contents_container}>
        <textarea defaultValue={content[0]} readOnly />
      </div>
      <ul className={styles.comments_container}>
        {
          comments.map(comment => (
            <li key={comment.comment_idx}>
              {comment.post_comment}
              <hr />
            </li>
          ))
        }
      </ul>
      <form className={styles.comment_write_container} onSubmit={onsubmit}>
        {auth ? (
          <>
            <span>댓글 쓰기</span>
            <input type="text" onChange={onChange} />
            <button>등록</button>
          </>
        ) : (
          <>
            <span>댓글 쓰기</span>
            <input type="text" onChange={onChange} placeholder="댓글을 쓰려면 로그인이 필요 합니다." disabled />
            <button disabled>등록</button>
          </>
        )}
      </form>
    </>
  )
  
  return (
    <div className={styles.post_page_container}>
      {loading ? <Loading /> : Body}
    </div>
  );
}

export default PostDetail;