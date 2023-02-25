import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';


export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>
      <HomeImage/>
        <OurServices/>
          
       
    
       
         
     </div>
  );
}
