import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editPost } from '../redux-module/post';
import PostEdit from '../components/post-edit/PostEdit';

function PostEditcontainer({postId}) {
  const { isAuthenticated, userName } = useSelector(state => state.auth);
  const { postDetail } = useSelector(state => state.post);
  const dispatch = useDispatch();

  /* 
    정상적으로 postDetail.user_name 또는 posstDetail[0].user_name 으로
    데이터를 불러왔는데 안불러와져서 (실제로 서버에서 데이터는 받아와졌는데 안불러와짐 이해불가ㅠㅠ)
    map으로 배열을 새로 만든후 꺼냄
  */
  const post = postDetail.map(post => (
    post.user_name
  ));

  const submit = body => dispatch(editPost(body));

  if (!isAuthenticated) return <div>잘못된 접근 입니다.</div>
  if (userName !== post[0]) return <div>잘못된 접근 입니다.</div>

  return (
    <>
      <PostEdit 
        postDetail={postDetail} 
        submit={submit}
        postId={postId}
      />
    </>
  );
}

export default PostEditcontainer;