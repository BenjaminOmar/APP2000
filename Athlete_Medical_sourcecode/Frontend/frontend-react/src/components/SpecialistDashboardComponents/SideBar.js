import React from 'react';
import { Link } from 'react-router-dom';


import SideBarCSS from './SideBar.module.css';
import { AiOutlineUser } from "react-icons/ai";

function SideBar() {
    const style = { color: "", fontSize: "2em" }
  return (
   <aside className={SideBarCSS.sidebarContainer}>
         <div className={SideBarCSS.contentContainer}> 
            <div className={SideBarCSS.titleWrapper}>
                <div className={SideBarCSS.icons}>
                    <AiOutlineUser style={style}/>
                </div>
                <div>
                    <span className={SideBarCSS.title}>Pasient</span> 
                </div>
            </div>
            <div className={SideBarCSS.linkWrapper}>
                <Link to='/' className={SideBarCSS.links}>Finn Pasient</Link><br></br>
                <Link to='/' className={SideBarCSS.links}>Finn Avtalen</Link><br></br>
            </div>
        </div>
    
        <div className={SideBarCSS.contentContainer}> 
            <div className={SideBarCSS.titleWrapper}>
                <div className={SideBarCSS.icons}>
                    <AiOutlineUser style={style}/>
                </div>
                <div>
                    <span className={SideBarCSS.title}>Journal</span> 
                </div>
            </div>
            <div className={SideBarCSS.linkWrapper}>
                <Link to='/' className={SideBarCSS.links}>Finn Journal</Link><br></br>
                <Link to='/' className={SideBarCSS.links}>Skriv Journal</Link><br></br>
                <Link to='/' className={SideBarCSS.links}>Endre Journal</Link><br></br>
            </div>
        </div>
        <div className={SideBarCSS.contentContainer}> 
            <div className={SideBarCSS.titleWrapper}>
                <div className={SideBarCSS.icons}>
                    <AiOutlineUser style={style}/>
                </div>
                <div>
                    <span className={SideBarCSS.title}>Timeplan</span> 
                </div>
            </div>
            <div className={SideBarCSS.linkWrapper}>
                <Link to='/' className={SideBarCSS.links}>Lag Timeplan</Link><br></br>
            </div>
        </div>
        
   </aside>
   
  );
}

export default SideBar;
