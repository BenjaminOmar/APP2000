/*This code imports various components such as a home image, a newsletter popup, a header, 
services, and specialists, and renders them on the home page of a React application. 
The function "Home" returns all these components enclosed in a div.
*/
import React from 'react';
import HomeImage from '../../components/Home/HomeImage';
import Popup from '../../components/Home/Newsletter';
import HeaderNormal from '../../components/Home/HeaderNormal';
import OurServices from '../../components/Home/OurServices';
import OurSpecialists from '../../components/Home/OurSpecialists';


export function Home() {
    return (
     <div>
      <Popup/>
      <HeaderNormal/>     
      <HomeImage/>
      <OurServices/> 
      <OurSpecialists/>        
     </div>
  );
}
