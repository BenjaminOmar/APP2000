import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';
import OurSpecialists from '../components/OurSpecialists';
import {CookiesModal} from '../components/CookiesModal';
import AppointmentBooking from './AppointmentBooking';
import SeeAllJournals from './SeeAllJournals';
import SeeAllAppointments from './SeeAllAppointments';



export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>
 <SeeAllJournals/>
      <SeeAllAppointments/>
      <CookiesModal/>
      <HomeImage/>
      <OurServices/> 
      <OurSpecialists/>                    
     </div>
  );
}
