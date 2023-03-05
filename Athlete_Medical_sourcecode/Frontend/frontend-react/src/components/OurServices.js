import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './OurServices.css';
import { Link } from 'react-router-dom';

function OurServices () {
  return (

    <>
    <Container fluid style={{paddingTop: '50px'}}>
   <Row className="justify-content-md-center">
    <Card border="dark"style={{ width: '18rem'}}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Ortopedi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Link to="/">Les mer her..</Link>
      </Card.Body>
    </Card>

    <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Fysioterapi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Link to="/">Les mer her..</Link>
      </Card.Body>
    </Card>

    <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Ortopedi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Link to="/">Les mer her..</Link>
      </Card.Body>
    </Card>

 <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Ortopedi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Link to="/">Les mer her..</Link>
      </Card.Body>
    </Card>
 </Row>
 </Container>
      </>


  );
}


export default OurServices;