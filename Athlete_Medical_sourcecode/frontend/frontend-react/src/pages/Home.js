



import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';
import OurSpecialists from '../components/OurSpecialists';
import {CookiesModal} from '../components/CookiesModal';


export function Home() {
    return (
     <div>
      <Popup/>
      <HeaderNormal/>
      <CookiesModal/>
      <HomeImage/>
      <OurServices/> 
      <OurSpecialists/>                    
     </div>
  );
}
