/*This code imports various components such as a home image, a newsletter popup, a header, 
services, and specialists, and renders them on the home page of a React application. 
Additionally, a cookies modal is also imported and rendered. The function "Home" returns all these components enclosed in a div.
*/
import React from 'react';
import HomeImage from '../../components/Home/HomeImage';
import Popup from '../../components/Home/Newsletter';
import HeaderNormal from '../../components/Home/HeaderNormal';
import OurServices from '../../components/Home/OurServices';
import OurSpecialists from '../../components/Home/OurSpecialists';
import { CookiesModal } from '../../components/Home/CookiesModal';

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
