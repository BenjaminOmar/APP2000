import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavLink } from 'react-bootstrap';
import './HeaderNormal.css';


function HeaderNormal () {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='brand'> <img src='/images/footerImage.png' alt='Logo'/>
              </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <NavLink to='/' className='list-item' activeClassName='active'>Hjem</NavLink>
            <NavLink to='/' className='list-item' activeClassName='active'>Tjenester</NavLink>
            <NavLink to='/' className='list-item' activeClassName='active'>Våre behandlere</NavLink>
            <NavLink to='/' className='list-item' activeClassName='active'>Kontakt oss</NavLink>
            </Nav>
            
            <Nav className='ms-auto'>
                <NavLink to='/'> <Button className='btn btn-success'>Logg inn</Button> </NavLink>
                  </Nav>
                 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNormal;