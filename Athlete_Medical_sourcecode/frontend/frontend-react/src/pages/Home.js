import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';
import OurSpecialists from '../components/OurSpecialists';
import {CookiesModal} from '../components/CookiesModal';
import FindPasient from './SpecialistDashboardPages/FindPasient';
import { Link } from 'react-router-dom';


export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>
      <CookiesModal/>
      <HomeImage/>
      <OurServices/> 
      <OurSpecialists/> 
      <Link to='/FindPasient'> <button>SpecialistDashboard</button> </Link>            
     </div>
  );
}



