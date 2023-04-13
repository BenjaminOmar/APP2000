/*This code defines a React component called Contact, which renders a contact form and 
displays contact information for the clinic. When the form is submitted, an alert message is displayed. 
The form includes fields for the user to enter their name, email, phone number, and a message subject and body.
*/

// Importing React, HeaderNormal component from "../components/HeaderNormal", and several Bootstrap components from 'react-bootstrap'
import React from "react";
import HeaderNormal from "../../components/Home/HeaderNormal";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

// Defining the Contact function
const Contact = () => {

    // Defining a function to handle the form submission, which displays an alert message
    const handleSubmit = () => {
        alert("Tusen takk for din henvendelse! Vi vil kontakte deg så snart som mulig.");
    }
    // Rendering the Contact component
    return (
        <>
            <HeaderNormal /> {/* Rendering the HeaderNormal component */}
            {/* Rendering three columns for displaying the clinic's contact information */}
            <Container style={{ marginTop: "50px", marginBottom: "50px" }}>{/* A container component to hold other components */}
                <Row>
                    <Col>
                        <h3>Åpningstider</h3>
                        <br />
                        <p>Mandag-fredag: 07:00-17:00</p>
                        <p>Lørdag-søndag: Stengt</p>
                    </Col>
                    <Col>
                        <h3>Telefontider</h3>
                        <br />
                        <p>Mandag-fredag: 08:00-16:00</p>
                        <p>Lørdag-søndag: Stengt </p>
                    </Col>
                    <Col>
                        <h3>Kontaktinformasjon</h3>
                        <br />
                        <p><i className='fas fa-home me-3'></i>Kongens gate 21A, 0153 Oslo</p>
                        <p><i className='fas fa-envelope me-3'></i>kontakt@athletemedical.no</p>
                        <p><i className='fas fa-phone me-3'></i>+ 47 234 567 88</p>
                    </Col>
                </Row>
                {/* Rendering a card with a contact form */}
                <div style={{ marginTop: "50px" }} className="d-flex justify-content-center align-items-start ">
                    <Card style={{ width: "700px" }}>
                        <Card.Header  >
                            <h4 style={{ textAlign: "center" }}>Kontaktskjema</h4>
                            <p style={{ textAlign: "center" }}> Fyll ut skjemaet, så vil en av våre erfarne medarbeidere kontakte deg innen 2 virkedager</p>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                {/* Render a form group for the subject input */}
                                <Form.Group controlId="formSubject" style={{ marginBottom: "20px" }}>
                                    <Form.Label>Overskrift</Form.Label>
                                    <Form.Control type="text" placeholder="Hva gjelder henvendelsen?" required />
                                </Form.Group>
                                {/* Render a form group for the subject input */}
                                <Form.Group controlId="formInfo" style={{ marginBottom: "20px" }}>
                                    <Form.Label>Hva kan vi hjelpe deg med?</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Skriv inn informasjon" required />
                                </Form.Group>
                                {/* Render a form group for the subject input */}
                                <Form.Group controlId="formName" style={{ marginBottom: "20px" }}>
                                    <Form.Label>Navn</Form.Label>
                                    <Form.Control type="text" placeholder="Skriv inn navn" required />
                                </Form.Group>
                                {/* Render a form group for the subject input */}
                                <Form.Group controlId="formEmail" style={{ marginBottom: "20px" }}>
                                    <Form.Label>E-postadresse</Form.Label>
                                    <Form.Control type="email" placeholder="Skriv inn e-postadresse" required />
                                </Form.Group>
                                {/* Rendering a form group for the phone number input */}
                                <Form.Group controlId="formPhone" style={{ marginBottom: "20px" }}>
                                    <Form.Label>Telefonnummer</Form.Label >
                                    <Form.Control type="tel" placeholder="Skriv inn telefonnummer" />
                                </Form.Group>
                                {/*// A button component to submit the form */}
                                <Button variant="primary" type="submit"
                                    style={{  //A style object to modify the button's appearance 
                                        paddingLeft: "150px",
                                        paddingRight: "150px",
                                        textAlign: "center",
                                        backgroundColor: "#0050B1",
                                        marginLeft: "20%"
                                    }}
                                >
                                    Send melding{/* The text displayed on the button */}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    );
};

// Export the Contact component for use in other modules
export default Contact;