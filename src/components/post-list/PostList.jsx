import React from 'react';
import Post from './Post';
import styles from './PostList.module.css';

function PostList({ posts }) {
  return (
    <ul className={styles.post_list}>
      {posts.map(post => (
        <Post 
          key={post.id}
          img={post.img}
          title={post.title}
          desc={post.desc}
          date={post.date}
          user={post.user}
          comments={post.comments}
          views={post.views}
        />
      ))}
    </ul>
  );
}

export default PostList;