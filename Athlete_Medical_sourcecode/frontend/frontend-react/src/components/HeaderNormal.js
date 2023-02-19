import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function HeaderNormal() {
  return (
    <nav>
      <ul>
        <li>
        <Button style={{backgroundColor:'#0050B1'}}> {/*Button component is used to define the style of the button*/}
            <Link to="/" style={{color: '#fff', textDecoration: 'none'}}> {/*Define the link to the Booking Page, set color of the text*/}
                Hjem
            </Link>             
        </Button>
          
        </li>
        <li>
        <Button style={{backgroundColor:'#0050B1'}}> 
            <Link to="/login " style={{color: '#fff', textDecoration: 'none'}}> {/*Define the link to the Booking Page, set color of the text*/}
                Login
            </Link>             
        </Button>
          
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNormal;