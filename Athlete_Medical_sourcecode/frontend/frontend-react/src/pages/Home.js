import React from 'react';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import OurServices from '../components/OurServices';
import Dashboard from '../pages/Dashboard';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>
      <HomeImage/>
      <OurServices/> 
      <Button style={{backgroundColor:'#0050B1'}}> {/*Button component is used to define the style of the button*/}
            <Link to="/dashboardForm" style={{color: '#fff', textDecoration: 'none'}}> {/*Define the link to the Booking Page, set color of the text*/}
                Dashboard
           </Link>             
        </Button>
       
      
       
         
     </div>
  );
}
