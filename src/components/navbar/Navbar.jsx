import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import styles from './Navbar.module.css';
import classNames from 'classnames';
import { FaSignInAlt, FaBars } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <header className={styles.header}>
        <Link to="#" className={styles.open_menu_bar_btn}>
          <FaBars onClick={showSidebar} />
        </Link>
        <Link to="/" className={styles.blog_name}>Blog</Link>
        <Link to="/login" className={styles.login_btn}>
          <FaSignInAlt />
        </Link>
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