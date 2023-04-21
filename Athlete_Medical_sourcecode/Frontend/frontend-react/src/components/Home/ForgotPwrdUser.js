// This component is a form that allows the user to send an email and receive 
//instructions to reset their password and retrieve their username. 

// Import the necessary modules from React, React Bootstrap, and React Router DOM. 
import React from "react";
import { Button, Card, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeaderNormal from "./HeaderNormal";
import { useState } from "react";

// Define the ForgotPwrdUser component.
const ForgotPwrdUser = () => {

    // Define state variables using the useState hook and navigation hook to navigate the user
    const navigate = useNavigate();
    const [infoMessage, setInfoMessage] = useState('');
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior.
        event.preventDefault();
        // Display an alert to indicate that an email has been sent to the user with instructions.
        setInfoMessage('Vi har nå sendt deg en epost med brukernavn og instruksjoner for å tilbakestille passordet'); // Set the error message from backend api
        setShowInfoModal(true); // Show the info modal
        // Add a delay of 2 seconds before navigating to the login page.
        await new Promise(resolve => setTimeout(resolve, 5000)); 
        navigate('/login'); // Navigate to the login page.
    }    

    // This is a functional component that renders a form where users can enter their email
    return (
        // A fragment is used here to wrap the HeaderNormal component and the form in the return statement.
        <>
            {/* HeaderNormal component is imported and rendered at the top of the form. */}
            <HeaderNormal />
            {/* The form is contained within a div with some inline styles applied to center the form on the page. */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "calc(100vh - 200px - 200px)",
                }}
            >
                {/* A react-bootstrap Card component is used to contain the form. */}
                <Card style={{ width: '400px', margin: "20px" }} >
                    <Card.Header closeButton> Glemt passord eller brukernavn?</Card.Header>
                    {/* Card.Body contains the form elements */}
                    <Card.Body>
                        Skriv inn din epost her, så sender vi deg instruksjoner!
                        {/* A react-bootstrap Form component is used to contain the form input elements.    */}
                        <Form onSubmit={handleSubmit}>
                            {/* Form.Control is a react-bootstrap input element that is styled with some margin applied */}
                            <Form.Control
                                style={{ marginTop: "15px" }}
                                type="email"
                                placeholder="epost@eksempel.no"
                                required
                            />
                            {/* A react-bootstrap Button component is used to submit the form. */}
                            <Button
                                variant="primary"
                                type="submit"
                                style={{
                                    paddingLeft: "150px",
                                    paddingRight: "150px",
                                    marginTop: "30px",
                                    marginLeft: "10px",
                                    marginBottom: "20px",
                                    backgroundColor: "#0050B1",
                                }}>
                                Send
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                {/* This creates a modal that is displayed when the "showInfoModal" state is set to "true". */}
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

        </>
    )
};
// Export the ForgotPwrdUser component as the default export of the module.
export default ForgotPwrdUser;