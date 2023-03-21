import React from 'react';
import { Link } from 'react-router-dom';


import SideBarCSS from './SideBar.module.css';
import { AiOutlineUser } from "react-icons/ai";

function SideBar() {
  return (
   <aside className={SideBarCSS.sidebarContainer}>
         <div className={SideBarCSS.patient}> 
         <div className={SideBarCSS.icons}><AiOutlineUser/></div>
         <h1 className={SideBarCSS.title}>pasient</h1>
         </div>  
        <Link to='/' className={SideBarCSS.links}>finn pasient</Link><br></br>
        <Link to='/' className={SideBarCSS.links}>finn avtalen</Link><br></br>
        <div className={SideBarCSS.icons}><AiOutlineUser/></div>
        <div className={SideBarCSS.journal}>
        <h1 className={SideBarCSS.title}>journal</h1>
        </div>
        <Link to='/' className={SideBarCSS.links}>finn journal</Link><br></br>
        <Link to='/' className={SideBarCSS.links}>skrive journal</Link><br></br>
        <Link to='/' className={SideBarCSS.links}>oppdater journal</Link><br></br>
        <div className={SideBarCSS.icons}><AiOutlineUser/></div>
        <div className={SideBarCSS.schedule}>
        <h1 className={SideBarCSS.title}>timeplan</h1>
        </div>
        <Link to='/' className={SideBarCSS.links}>lever timeplan</Link>
   </aside>
   
  );
}

export default SideBar;
