import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

const AdminSeeJournal = () => {
    const username =  Cookies.get("username");
    return (
        <>
            <HeaderAdmin/>
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <div><h2>Velkommen {username} </h2></div>
                <div>
                   
                </div>             
        
      
       
            </div>     
        </>
    )  
}

export default AdminSeeJournal;