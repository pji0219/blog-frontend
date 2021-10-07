import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetail, POST_DELETE_REQUEST } from '../redux-module/post';
import PostDetail from '../components/post-detail/PostDetail';
import styles from './PostDetailContainer.module.css';

function PostDetailContainer({postId}) {
  const {loading, error, postDetail} = useSelector(state => state.post);
  const {userName} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostDetail(postId));
  }, [postId, dispatch]);

  const postDelete = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: postId
    });
  }
  // npx browserslist@latest --update-db
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
        />
      )}
    </>
  );
}

export default PostDetailContainer;