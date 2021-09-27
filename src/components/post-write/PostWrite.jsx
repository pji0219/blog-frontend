import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from '../../editor/EditorConfig';
import Myinit from '../../editor/UploadAdapter';
import styles from './PostWrite.module.css';

function PostWrite({ submit, userName, userIdx }) {
  const [form, setForm] = useState({
   post_write: '',
   category_idx: 0,
   user_idx: 0,
   post_title: '',
   content: ''
  });
  const {post_write, category_idx, content, post_title, user_idx} = form;

  // 로그인 인증 된 사용자를 넣어줌
  useEffect(() => {
    setForm({
      ...form,
      post_write: userName,
      user_idx: userIdx
    });
  }, [userName, userIdx, form]);
  
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
    const token = localStorage.getItem('token');
    const body = {
      post_write,
      category_idx,
      post_title,
      content,
      user_idx,
      token
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
          <label htmlFor="category">카테고리</label>
          <input 
            type="text" 
            name="category_idx"
            value={category_idx || ''}
            onChange={onChange} 
            placeholder="카테고리를 입력하세요." 
          />
        </div>
        <CKEditor 
          editor={ClassicEditor}
          config={editorConfiguration}
          onReady={Myinit}
          onBlur={getDataFromCKEditor}
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

export default PostWrite;