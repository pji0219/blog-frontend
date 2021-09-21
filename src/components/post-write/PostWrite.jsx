import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from '../../editor/EditorConfig';
import Myinit from '../../editor/UploadAdapter';
import styles from './PostWrite.module.css';

function PostWrite({ submit }) {
  const {value, setValues} = useState({
    title: ""
  })

  return (
    <>
      <form>
        <div className={styles.input_container}>
          <label htmlFor="title">제목</label>
          <input type="text" placeholder="제목을 입력 하세요." />
          <label htmlFor="category">카테고리</label>
          <input type="text" placeholder="카테고리를 입력하세요." />
        </div>
        <CKEditor 
          editor={ClassicEditor}
          config={editorConfiguration}
          onReady={Myinit}
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