import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getPosts } from '../redux-module/post';
import PostList from '../components/post-list/PostList';
import Loading from '../components/loading-spinner/Loading';

function PostListContainer() {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;
  return <PostList posts={data} />;
}

export default PostListContainer;