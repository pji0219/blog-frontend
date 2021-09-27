import React from 'react';
import Post from './Post';
import styles from './PostList.module.css';

function PostList({ posts }) {
  return (
    <ul className={styles.post_list}>
      {posts.map((post, index) => (
        <Post 
          key={index}
          img={post.Img}
          title={post.post_title}
          contents={post.content}
          date={post.post_Date}
          user={post.post_write}
          comments={post.comments}
          views={post.post_see}
        />
      ))}
    </ul>
  );
}

export default PostList;