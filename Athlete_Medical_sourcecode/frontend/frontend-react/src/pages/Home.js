import React from 'react';
import Footer from '../components/Footer';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import { Button } from 'react-bootstrap';
import OurServices from '../components/OurServices';
import { Link } from 'react-router-dom';

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
