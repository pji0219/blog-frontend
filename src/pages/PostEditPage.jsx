import React from 'react';
import PostEditcontainer from '../container/PostEditcontainer';

function PostEditPage(req) {
  const postId = req.match.params.id;

  return (
    <>
      <PostEditcontainer postId={postId} />
    </>
  );
}

export default PostEditPage;