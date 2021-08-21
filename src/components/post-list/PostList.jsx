import React from 'react';
import Post from './Post';
import styles from './PostList.module.css';

function PostList({ posts }) {
  return (
    <section className={styles.post_list_container}>
      <ul className={styles.post_list}>
        {posts.map(post => (
          <Post 
            key={post.id}
            post={post}
          />
        ))}
      </ul>
    </section>
  );
}

export default PostList;