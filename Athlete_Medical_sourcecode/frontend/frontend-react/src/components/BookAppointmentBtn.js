//This code creates a button component that includes a link to the '/booking' route
import React from 'react';
import {Button} from 'react-bootstrap';// Import the Button component from react-bootstrap
import {Link} from 'react-router-dom';// Import the Link component from react-router-dom

function BookAppointmentBtn (){
    return(
        <>        
            <Button style={{backgroundColor:'#0050B1'}}> {/*Button component is used to define the style of the button*/}
                <Link to="/booking " style={{color: '#fff', textDecoration: 'none'}}> {/*Define the link to the Booking Page, set color of the text*/}
                    Bestill Avtale
                </Link>             
            </Button>
        </>
    );
}
export { BookAppointmentBtn }; //exports the function for use in other parts of the application