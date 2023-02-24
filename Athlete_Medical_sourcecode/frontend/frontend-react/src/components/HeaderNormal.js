import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, NavLink } from 'react-bootstrap';
import './HeaderNormal.css';
import { Link } from 'react-router-dom';


function HeaderNormal () {
  return (
    <Navbar className="navbar" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='brand'> <img src='../images/footerImage.png' alt='Logo'/>
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
                <Button style={{backgroundColor:'#0050B1'}}>
                  <Link to="/login " style={{color: '#fff', textDecoration: 'none'}}>
                    Logg inn
                  </Link>
                </Button> 
                  </Nav>
                 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNormal;