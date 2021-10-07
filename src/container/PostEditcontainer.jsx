import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editPost } from '../redux-module/post';
import PostEdit from '../components/post-edit/PostEdit';
import axios from 'axios';

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
  
  // 여기서 api호출 후 응답 결과를 디스패치 해서 사가로 전달하도록 구현 함
  const submit = async body => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/article/detail?articles_idx=${postId}`, body);
      dispatch(editPost(res));
    } catch(err) {
      alert('에러가 발생하였습니다.');
    }
  }

  if (!isAuthenticated) return <div>잘못된 접근 입니다.</div>
  if (userName !== post[0]) return <div>잘못된 접근 입니다.</div>

  return (
    <>
      <PostEdit 
        postDetail={postDetail} 
        submit={submit}
      />
    </>
  );
}

export default PostEditcontainer;