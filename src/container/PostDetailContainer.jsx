import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetail, POST_DELETE_REQUEST } from '../redux-module/post';
import PostDetail from '../components/post-detail/PostDetail';
import styles from './PostDetailContainer.module.css';
import { loadComments, uploadComments,  } from '../redux-module/comment';
// import axios from 'axios';

function PostDetailContainer({postId}) {
  const {loading, error, postDetail} = useSelector(state => state.post);
  const {userName, isAuthenticated, userIdx} = useSelector(state => state.auth);
  const { comments } = useSelector(state => state.comments);

  const dispatch = useDispatch();

  // 포스트 상세페이지와 댓글을 불러옴
  useEffect(() => {
    dispatch(getPostDetail(postId));
    dispatch(loadComments(postId));
    // axios.get(`${process.env.REACT_APP_SERVER_URL}/comment?articles_idx=${postId}`)
    //   .then(res => {
    //     dispatch(loadComments(res.data.results));
    //     console.log(res.data.results, '코멘트!!');
    //   });
  }, [postId, dispatch]);

  const postDelete = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: postId
    });
  }

  const uploadComment = body => dispatch(uploadComments(body));
  
  return (
    <>
      {error ? (
        <div className={styles.error_container}>
          <p>
            에러 발생!<br/>
            새로고침을 하시고 다시 포스트를 클릭 하시면 상세 페이지를 볼 수 있습니다.<br />
            죄송합니다.
          </p>
        </div>
      ) : (
        <PostDetail
          postDetail={postDetail}
          loading={loading}
          userName={userName}
          postId={postId}
          postDelete={postDelete}
          comments={comments}
          uploadComment={uploadComment}
          userIdx={userIdx}
          auth={isAuthenticated}
        />
      )}
    </>
  );
}

export default PostDetailContainer;