import React from 'react';
import Footer from '../components/Footer';
import HomeImage from '../components/HomeImage';
import Popup from '../components/Newsletter';
import HeaderNormal from '../components/HeaderNormal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function Home() {
    return (
     <div className="App">
      <Popup/>
      <HeaderNormal/>
      <HomeImage/> 
      <Button style={{backgroundColor:'#0050B1'}}> {/*Button component is used to define the style of the button*/}
            <Link to="/Login " style={{color: '#fff', textDecoration: 'none'}}> {/*Define the link to the Booking Page, set color of the text*/}
                Logg inn
            </Link>             
        </Button>
       
         
     </div>
  );
}
