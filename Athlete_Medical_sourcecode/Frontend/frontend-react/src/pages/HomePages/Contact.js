/*This code defines a React component called Contact, which renders a contact form and 
displays contact information for the clinic. When the form is submitted, an alert message is displayed. 
The form includes fields for the user to enter their name, email, phone number, and a message subject and body.
*/

// Importing React, HeaderNormal component from "../components/HeaderNormal", and several Bootstrap components from 'react-bootstrap'
import React, { useState } from "react";
import HeaderNormal from "../../components/Home/HeaderNormal";
import { Container, Row, Col, Form, Button, Card, Modal } from 'react-bootstrap';

// Defining the Contact function
const Contact = () => {
    // Define state variables using the useState hook
    const [infoMessage, setInfoMessage] = useState('');
    const [showInfoModal, setShowInfoModal] = useState(false);

    // Defining a function to handle the form submission, which displays a message
    const handleSubmit = () => {
        setInfoMessage("Tusen takk for din henvendelse! Vi vil kontakte deg så snart som mulig."); // Set the error message
        setShowInfoModal(true); // Show the info modal
        setTimeout(() => {
            window.location.reload();
        }, 3000); // Wait 3 seconds before reloading the page
    }
    
    // Rendering the Contact component
    return (
        <div style={{ minHeight: 'calc(100vh - 275px)', marginBottom: '70px' }} >
            <HeaderNormal /> {/* Rendering the HeaderNormal component */}
            {/* Rendering three columns for displaying the clinic's contact information */}
            <Container style={{ marginTop: "50px", marginBottom: "50px" }}>{/* A container component to hold other components */}
                <Row >
                    <Col style={{ marginLeft: '12%' }}>
                        <h3>Åpningstider</h3>
                        <br />
                        <p>Mandag-fredag: 07:00-17:00</p>
                        <p>Lørdag-søndag: Stengt</p>
                    </Col>
                    <Col style={{ marginLeft: '2%' }}>
                        <h3>Telefontider</h3>
                        <br />
                        <p>Mandag-fredag: 08:00-16:00</p>
                        <p>Lørdag-søndag: Stengt </p>
                    </Col>
                    <Col >
                        <h3>Kontaktinformasjon</h3>
                        <br />
                        <p><i className='fas fa-home me-3'></i>Kongens gate 21A, 0153 Oslo</p>
                        <p><i className='fas fa-envelope me-3'></i>kontakt@athletemedical.no</p>
                        <p><i className='fas fa-phone me-3'></i>+ 47 234 567 88</p>
                    </Col>
                </Row>
                {/* Rendering a card with a contact form */}
                <div style={{ marginTop: "50px", }} className="d-flex justify-content-center align-items-start ">
                    <Card style={{ width: "700px" }}>
                        <Card.Header  >
                            <h4 style={{ textAlign: "center" }}>Kontaktskjema</h4>
                            <p style={{ textAlign: "center" }}> Fyll ut skjemaet, så vil en av våre erfarne medarbeidere kontakte deg innen 2 virkedager</p>
                        </Card.Header>
                        <Card.Body>
                            <Form >
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
                                <div style={{ display: "grid", placeItems: "center" }}>
                                    <Button 
                                        variant="primary" 
                                        onClick= {handleSubmit}
                                        style={{  //A style object to modify the button's appearance 
                                            paddingLeft: "100px",
                                            paddingRight: "100px",
                                            backgroundColor: "#0050B1"                                           
                                        }}
                                    >
                                        Send melding{/* The text displayed on the button */}
                                    </Button>
                                </div>

                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            <Modal
                show={showInfoModal}
                onHide={() => setShowInfoModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton> {/* This creates a header within the modal dialog with a close button. */}
                    <Modal.Title></Modal.Title> {/* This sets the title of the modal dialog. */}
                </Modal.Header>
                <Modal.Body>{infoMessage}</Modal.Body> {/* This displays the error message within the modal dialog. */}
                <Modal.Footer>
                    <Button style={{ width: '60%', marginRight: '21%' }} variant="primary" onClick={() => setShowInfoModal(false)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// Export the Contact component for use in other modules
export default Contact;