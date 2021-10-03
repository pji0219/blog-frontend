import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostDetail } from '../redux-module/post';
import PostDetail from '../components/post-detail/PostDetail';

function PostDetailContainer({postId}) {
  const {loading, error, postDetail} = useSelector(state => state.post);
  const {userName} = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostDetail(postId));
  }, [postId, dispatch]);

  if (error) return <div>에러 발생!</div>;

  return (
    <>
      <PostDetail
        postDetail={postDetail}
        loading={loading}
        userName={userName}
      />
    </>
  );
}

export default PostDetailContainer;