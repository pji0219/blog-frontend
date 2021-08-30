import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getPosts } from '../redux-module/post';
import PostList from '../components/post-list/PostList';
import Loading from '../components/loading-spinner/Loading';
import Pagination from '../components/pagination/Pagination';

function PostListContainer() {
  const { data, loading, error } = useSelector(state => state.posts.posts);
  
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 당 포스트 수
  const [postPerPage] = useState(12);

  const dispatch = useDispatch();

  // 컴포넌트 마운트 후 포스트 목록 요청
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // pagination, 한 페이지 당 포스트 12개
  // 12 (첫 페이지 기준)
  const indexOfLastPost = currentPage * postPerPage;
  // 0 (첫 페이지 기준)
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  // 0부터 12전까지 자름 (기존 배열은 건들이지 않고 12번째 포스트까지 자름)
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
 
  // 페이지 변경
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) return <Loading />;
  if (error) return <div>에러 발생!</div>;
  if (!data) return <div>아직 포스트가 없습니다.</div>;
  return (
    <>
      <PostList posts={currentPosts} />
      <Pagination postsPerPage={postPerPage} totalPosts={data.length} paginate={paginate} currentPage={currentPage} />
    </>
  );
}

export default PostListContainer;