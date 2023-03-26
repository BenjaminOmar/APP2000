import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dropdown, DropdownButton} from 'react-bootstrap';
import './Header.css';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import picture from '../images/footerImage2.png';
import symbol from '../images/admin.png';

import Cookies from "js-cookie";

const HeaderAdmin = () => {

  const navigate = useNavigate();

  //Check if username and role are set in cookies, if not navigate to homepage
  const username = Cookies.get("username");
  const role = Cookies.get("role");
  if (!username || !role) {
    navigate("/");
    return null;
  }
  const handleLogout = () => {
   	// Sett the cookies to null and with an expire date in the past
		Cookies.set("role", null, { expires: new Date(0) });
		Cookies.set("username", null, { expires: new Date(0) });	
		// Naviger til hjem-siden etter at cookiene er slettet
		navigate("/");
  }

  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='brand'> 
        <img 
          src={picture} 
          alt='Logo'
          className={"logoAnimation"}         
        />
        
              </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">                        
            <NavLink to='/adminbooking' className='list-item' activeClassName='active'>Booking</NavLink>
            <NavLink to='/adminedituser' className='list-item' activeClassName='active'>Brukerkontoer</NavLink> 
            <NavLink to='/adminseejournal' className='list-item' activeClassName='active'>Journaler</NavLink>            
        </Nav>            
            <Nav className='ms-auto'> 
                <DropdownButton style={{backgroundColor: '#f8f9fa'}} title={<><img src={symbol} alt="Administrasjons symbol" /><span></span></>}>
                  <Dropdown.Item as={Link} to="/">Dine opplysninger</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logg ut</Dropdown.Item>
                    
                </DropdownButton>                           
             </Nav>
            
                 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderAdmin;