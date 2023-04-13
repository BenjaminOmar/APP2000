/*
This component represents the header component for the admin page.
It checks if the user has a valid username and role stored in cookies,
and displays a navigation bar with links to different pages.
It also provides a dropdown menu for the user to access their account information
and to log out of the system.
*/

import Container from 'react-bootstrap/Container';// importing Container component from react-bootstrap
import Nav from 'react-bootstrap/Nav';// importing Nav component from react-bootstrap
import Navbar from 'react-bootstrap/Navbar';// importing Navbar component from react-bootstrap
import { Dropdown, DropdownButton } from 'react-bootstrap';// importing Dropdown and DropdownButton components from react-bootstrap
import '../Header.css';// importing Header.css stylesheet
import { Link, NavLink, useNavigate } from 'react-router-dom';// importing Link, NavLink, and useNavigate from react-router-dom
import picture from '../../images/footerImage2.png';// importing an image file
import symbol from '../../images/admin.png';// importing an image file
import Cookies from "js-cookie";// importing Cookies module



// This component represents the header component for the admin page
const HeaderAdmin = () => {
  // Navigate variable using useNavigate hook from react-router-dom
  const navigate = useNavigate();

  const username = Cookies.get("username");// getting the value of the username cookie
  const role = Cookies.get("role");// getting the value of the role cookie
  const userId = Cookies.get("userId"); //getting the value of the userId cookie
  if (!username || !role ||!userId) {// if either username, userId or role cookie is not set
    navigate("/");// navigate to the homepage
    return null;// return null to prevent the rest of the code from executing
  }


    //This component delete browser cookies and navigates th the home page
  const handleLogout = () => {
    // Sett the cookies to null and with an expire date in the past
    Cookies.set("role", null, { expires: new Date(0) });
    Cookies.set("username", null, { expires: new Date(0) });
    Cookies.set("userId", null, { expires: new Date(0) });
    // Navigate to the homepage after the cookies are deleted
    navigate("/");
  }

  return (
    <Navbar className="navbar" expand="lg"> {/* The main navigation bar component */}
      <Container>
        <Navbar.Brand href="/" className='brand'> {/* A navigation bar brand component with a link to the homepage */}
          <img
            src={picture}
            alt='Logo'
            className={"logoAnimation"}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"> {/* A navigation bar component with a right-aligned list of navigation items */}
            <NavLink to='/adminbooking' className='list-item' activeClassName='active'>Booking</NavLink>
            <NavLink to='/adminedituser' className='list-item' activeClassName='active'>Brukerkontoer</NavLink>
            <NavLink to='/adminseejournal' className='list-item' activeClassName='active'>Journaler</NavLink>
          </Nav>
          <Nav className='ms-auto'>{/* A navigation bar component with a right-aligned dropdown menu */}
            <DropdownButton style={{ backgroundColor: '#f8f9fa' }} title={<><img src={symbol} alt="Administrasjons symbol" /><span></span></>}>
              <Dropdown.Item as={Link} to="/alteruser">Dine opplysninger</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logg ut</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderAdmin;