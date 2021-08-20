import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import styles from './Navbar.module.css';
import { FaSignInAlt } from "react-icons/fa";

function Navbar() {
  return (
    <>
      <header className={styles.header}>
        <span className={styles.blog_name}>Blog</span>
        <span className={styles.login_btn}>
          <FaSignInAlt />
        </span>
      </header>
      <nav className={styles.nav_menu}>
        <ul className={styles.nav_menu_items}>
          {
            SidebarData.map((item, index) => {
              return (
                <li key={index} className={styles.nav_text}>
                  <Link to={item.path}>
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