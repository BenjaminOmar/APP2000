import React from 'react';
import { BookAppointmentBtn } from './BookAppointmentBtn'; //import the BookingAppointmentBtn component
import video from '../images/pexels-cottonbro-5310858.mp4'; //Importing video
import './HomeImage.css'; //Importing the styles for this component

function HomeImage(){
    return(
        <div className='homeImageContainer'>
            <video src={video} autoPlay loop muted className="homeImage" />
            <div className='homeImageOverlay'>
                <h1 className='homeImageHeading'>Informasjon Om Oss!</h1>
                <p className='homeImageText'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                    cillum dolore eu fugiat nulla pariatur.
                    <div className='d-flex justify-content-center mt-4'>
                        <div style={{display:'block', margin: '0 auto'}}>
                            <BookAppointmentBtn />
                        </div>                        
                    </div>
                      
                </p>
            </div>
        </div>
    )
}

export default HomeImage;
