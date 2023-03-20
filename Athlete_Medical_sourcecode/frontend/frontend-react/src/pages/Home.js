import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';
import OurSpecialists from '../components/OurSpecialists';
import {CookiesModal} from '../components/CookiesModal';
import Appointment from '../components/Appointment';

export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>
      <CookiesModal/>
      <HomeImage/>
      <Appointment/>
      <OurServices/> 
      <OurSpecialists/>    
      
     </div>
  );
}
