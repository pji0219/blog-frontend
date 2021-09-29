import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadPost } from '../redux-module/post';
import PostWrite from '../components/post-write/PostWrite';

function PostWriteContainer() {
  const { isAuthenticated, user_idx, user_name } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const submit = body => dispatch(uploadPost(body));

  if (!isAuthenticated) return <div>로그인이 필요 합니다.</div>
  return (
    <>
      <PostWrite submit={submit} userIdx={user_idx} userName={user_name} />
    </>
  );
}

export default PostWriteContainer;