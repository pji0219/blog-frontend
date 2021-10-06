import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from '../../editor/EditorConfig';
import Myinit from '../../editor/UploadAdapter';
import styles from './PostEdit.module.css';

function PostEdit({ submit, postDetail, postId}) {
  const [form, setForm] = useState({
    content: '',
    category_idx: null,
    post_title: '',
    article_idx: null
  });
  const {content, category_idx, post_title, article_idx} = form;
  /* 
    데이터에 있는 작성자를 가져오기 위함 
    ( postDetail.content 또는 postDetail[0].content로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
  */
  const contents = postDetail.map(post => (
    post.content
  ));
  const [contentItem] = contents;

  /* 
    데이터에 있는 카테고리 인덱스를 가져오기 위함 
    ( postDetail.articles_idx 또는 postDetail[0].articles_idx로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
  */
    const categoryIdx = postDetail.map(post => (
      post.category_idx
    ));

  /* 
    데이터에 있는 타이틀을 가져오기 위함 
    ( postDetail.post_title 또는 postDetail[0].post_title로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
  */
    const title = postDetail.map(post => (
      post.post_title
    ));
  
  /* 
    데이터에 있는 아티클 인덱스를 가져오기 위함 
    ( postDetail.articles_idx 또는 postDetail[0].articles_idx로 정상적으로 했는데도 오류가 나서 ㅠㅠ )
  */
    // const articleIdx = postDetail.map(post => (
    //   post.article_idx
    // ));
  
  
  useEffect(() => {
    setForm({
      content: contents,
      category_idx: categoryIdx,
      post_title: title,
      article_idx: postId
    });
  }, []);
   
  const onChange = event => {
    const name = event.target.name;
    const value = event.target.value;
 
    setForm({
      ...form,
      [name] : value
    });
  }
 
  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData();
    // console.log(data);

    // if (!data) {
    //   alert('글을 입력 하세요.');
    // }

    // if (data && data.match("<img src=")) {
    //   const whereImg_start = data.indexOf("<img src=");
    //   console.log(whereImg_start);
    //   let whereImg_end = "";
    //   let ext_name_find = "";
    //   let result_Img_Url = "";

    //   const ext_name = ["jpeg", "png", "jpg", "gif"];

    //   for (let i = 0; i < ext_name.length; i++) {
    //     if (data.match(ext_name[i])) {
    //       console.log(data.indexOf(`${ext_name[i]}`));
    //       ext_name_find = ext_name[i];
    //       whereImg_end = data.indexOf(`${ext_name[i]}`);
    //     }
    //   }
    //   console.log(ext_name_find);
    //   console.log(whereImg_end);

    //   if (ext_name_find === "jpeg") {
    //     result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
    //   } else {
    //     result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
    //   }

    //   console.log(result_Img_Url, "result_Img_Url");
    //   setForm({
    //     ...form,
    //     fileUrl: result_Img_Url,
    //     contents: data,
    //   });

    // } else if (data){
    //   setForm({
    //     ...form,
    //     fileUrl: "",
    //     contents: data,
    //   });

    // }
    setForm({
      ...form,
      content: data
    });
  }

  const onSubmit = async event => {
    await event.preventDefault();
    const body = {
      content,
      category_idx,
      post_title,
      article_idx
    }
    submit(body);
  }
 
  return (
  <>
    <form onSubmit={onSubmit}>
      <div className={styles.input_container}>
        <label htmlFor="title">제목</label>
        <input 
          type="text"
          name="post_title"
          value={post_title || ''}
          onChange={onChange}
          placeholder="제목을 입력 하세요." 
        />
        <label htmlFor="category" className={styles.category_label}>카테고리를 선택하세요:
          <select name="category_idx" value={category_idx} onChange={onchange}>
            <option value="1">Home</option>
            <option value="2">About</option>
            <option value="3">HTML</option>
            <option value="4">CSS</option>
            <option value="5">JavaScript</option>
          </select>
        </label>
      </div>
      <CKEditor 
        editor={ClassicEditor}
        config={editorConfiguration}
        onReady={Myinit}
        onBlur={getDataFromCKEditor}
        data={contentItem}
      />
      <div className={styles.btn_container}>
        <button type="submit">
          완료
        </button>
        <button>
          <Link to="/">취소</Link>
        </button>
      </div>
    </form>
  </>
  );
}

export default PostEdit;