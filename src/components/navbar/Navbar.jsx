import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import styles from './Navbar.module.css';
import classNames from 'classnames';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from "react-icons/fa"

function Navbar({ auth, userLogout }) {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    userLogout()
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="#" className={styles.open_menu_bar_btn}>
          <FaBars onClick={showSidebar} />
        </Link>
        <Link to="/" className={styles.blog_name}>Blog</Link>
        {auth ? 
          (
            <Link to="/write">
              <button className={styles.create_post_btn}>
                글쓰기
              </button>
            </Link>
          ) : null
        }
        {auth ? 
          (
            <button 
              className={styles.logout_btn}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          ) 
          : (
            <Link to="/login" >
              <button className={styles.login_btn}>
                로그인 / 등록
              </button>
            </Link>
          )
        }
      </header>
      <nav className={sidebar ? classNames({[styles.nav_menu]: true, [styles.active]: true}) : styles.nav_menu}>
        <ul className={styles.nav_menu_items}>
          <li className={styles.navbar_toggle}>
            <Link to="#" className={styles.close_menu_bar_btn}>
              <AiOutlineClose onClick={showSidebar}/>
            </Link>
          </li>
          {
            SidebarData.map((item, index) => {
              return (
                <li key={index} className={styles.nav_text}>
                  <Link to={item.path} onClick={showSidebar}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </nav>
    </>
  );
}

export default Navbar;