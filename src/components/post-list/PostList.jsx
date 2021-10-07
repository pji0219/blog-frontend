import React from 'react';
import Post from './Post';
import styles from './PostList.module.css';

function PostList({ posts }) {
  return (
    <ul className={styles.post_list}>
      {posts.map(post => (
        <Post 
          key={post.articles_idx}
          url={post.articles_idx}
          img={post.Img}
          title={post.post_title}
          date={post.post_Date}
          user={post.post_write}
          star={post.star}
          views={post.post_see}
        />
      ))}
    </ul>
  );
}

export default PostList;