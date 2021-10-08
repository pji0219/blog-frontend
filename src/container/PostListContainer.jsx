import React, { useEffect, useState } from 'react';
import PostList from '../components/post-list/PostList';
import Loading from '../components/loading-spinner/Loading';
import Pagination from '../components/pagination/Pagination';
import axios from 'axios';

function PostListContainer() {
  const [totalData, setTotaldata] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 12;
  
  // 컴포넌트 마운트시 처음 페이지 12개 포스트 불러옴
  // 그리고 전체 포스트 값을 구하기 위해 전체 포스트도 호출
  useEffect(() => {
    axios
      .all(
        [ 
          axios.get(`${process.env.REACT_APP_SERVER_URL}/article/page?page=1`), 
          axios.get(`${process.env.REACT_APP_SERVER_URL}/article`)
        ]
      )
      .then(axios.spread((res1, res2) => {
        setData(res1.data.results);
        setTotaldata(res2.data.results);
        setLoading(false);
      }))
      .catch(err => {
        console.log(err);
        setLoading(false);
        setErr(true);
      });
  }, []);
  
  // 페이지를 바꾸고 다른 페이지의 12개 포스트를 불러옴
  const paginate = pageNum => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/article/page?page=${pageNum}`)
      .then(res => {
        setData(res.data.results);
        setCurrentPage(pageNum);
      })
      .catch(err => {
        console.log(err);
        setErr(true);
      });
  }
  
  if(loading) return <Loading />
  if(err) return <div>에러가 발생 하였습니다.</div>
  return (
    <>
      <PostList posts={data} />
      <Pagination postsPerPage={postPerPage} totalPosts={totalData.length} paginate={paginate} currentPage={currentPage} />
    </>
  );
}

export default PostListContainer;