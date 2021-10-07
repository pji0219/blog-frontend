import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetail, POST_DELETE_REQUEST } from '../redux-module/post';
import PostDetail from '../components/post-detail/PostDetail';

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

  if (error) return <div>에러 발생!</div>;

  return (
    <>
      <PostDetail
        postDetail={postDetail}
        loading={loading}
        userName={userName}
        postId={postId}
        postDelete={postDelete}
      />
    </>
  );
}

export default PostDetailContainer;