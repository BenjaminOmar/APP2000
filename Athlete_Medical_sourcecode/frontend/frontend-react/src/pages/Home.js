/*This code imports various components such as a home image, a newsletter popup, a header, 
services, and specialists, and renders them on the home page of a React application. 
Additionally, a cookies modal is also imported and rendered. The function "Home" returns all these components enclosed in a div.
*/
import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';
import OurSpecialists from '../components/OurSpecialists';
import {CookiesModal} from '../components/CookiesModal';
import { Link } from 'react-router-dom';



export function Home() {
    return (
     <div>
      <Popup/>
      <HeaderNormal/>
      <CookiesModal/>
      <HomeImage/>
      <OurServices/> 
      <OurSpecialists/>
     <Link to="/FindPasient" className="button">specialists</Link>   
     <Link to="/FutureAppointment" className="button">User dashboard</Link>         
     </div>
  );
}
