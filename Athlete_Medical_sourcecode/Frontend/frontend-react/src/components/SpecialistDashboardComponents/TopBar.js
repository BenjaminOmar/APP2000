import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/headerImage.jpg';
import loggOut from '../../images/admin.png';
import TopBarCSS from './TopBar.module.css';


function TopBar() {
  return (
    <nav className={TopBarCSS.navContainer}>
        <div className={TopBarCSS.logo}>
        <img src={logo} className={TopBarCSS.img1} alt="logo" />
        </div>
        <div className={TopBarCSS.loggOut}>
        <img src={loggOut} className={TopBarCSS.img2} alt="logo" />
        </div>
    </nav>
   
  );
}

export default TopBar;
