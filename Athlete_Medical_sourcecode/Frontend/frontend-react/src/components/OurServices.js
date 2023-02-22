import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './OurServices.css';

function OurServices () {
  return (

    <>
    <Container fluid>
   <Row className="justify-content-md-center">
    <Card border="dark"style={{ width: '18rem'}}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Ortopedi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Card.Link href="#">Les mer her..</Card.Link>
      </Card.Body>
    </Card>

    <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Fysioterapi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Card.Link href="#">Les mer her..</Card.Link>
      </Card.Body>
    </Card>

    <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Ortopedi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Card.Link href="#">Les mer her..</Card.Link>
      </Card.Body>
    </Card>

 <Card border="dark" style={{ width: '18rem' }}>
        <Card.Header>Våre tjenester</Card.Header>
      <Card.Body>
        <Card.Title>Ortopedi</Card.Title>
        <Card.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra volutpat mauris sed suscipit. 
        </Card.Text>  
        <Card.Link href="#">Les mer her..</Card.Link>
      </Card.Body>
    </Card>
 </Row>
 </Container>
      </>


  );
}


export default OurServices;