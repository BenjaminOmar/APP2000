import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import { Button } from 'react-bootstrap';

export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>

      <HomeImage/>
       
          
       
      <Footer />
      
     </div>
  );
}
