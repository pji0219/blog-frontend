import React from 'react';
import PostDetailContainer from '../container/PostDetailContainer';

function PostPage(req) {
  const postId = req.match.params.id;
  
  // URL 파라미터 값은 문자열이기 때문에 parseInt 를 사용하여 숫자로 변환해주어야함
  return (
    <>
     <PostDetailContainer postId={parseInt(postId, 10)} />
    </>
  );
}

export default PostPage;