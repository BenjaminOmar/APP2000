import React from 'react';
import { Link } from 'react-router-dom';


import SideBarCSS from './SideBar.module.css';


function SideBar() {
  return (
   <aside className={SideBarCSS.sidebarContainer}>
        <div className={SideBarCSS.patient}>pasient</div>
        <Link to='/' className={SideBarCSS.links}>finn pasient</Link><br></br>
        <Link to='/' className={SideBarCSS.links}>finn avtalen</Link><br></br>
        <div className={SideBarCSS.journal}>journal</div>
        <Link to='/' className={SideBarCSS.links}>finn journal</Link><br></br>
        <Link to='/' className={SideBarCSS.links}>skrive journal</Link><br></br>
        <Link to='/' className={SideBarCSS.links}>oppdater journal</Link><br></br>
        <div className={SideBarCSS.schedule}>timeplan</div>
        <Link to='/' className={SideBarCSS.links}>lever timeplan</Link>
   </aside>
   
  );
}

export default SideBar;
