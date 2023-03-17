// Importing necessary components and CSS styles
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {Form} from "react-bootstrap";
import './Newsletter.css'

// Defining the Newsletter component
function Newsletter(){

    // Creating a state variable called "show" and a function called 
    // "setShow" to toggle the display of the Modal
    const [show, setShow] = useState(false);

     // Returning JSX elements
    return(
        <>
            {/* A Button component that triggers the Modal when clicked */}
            <Button className="sidebar" style={{backgroundColor:'#0050B1'}} variant="primary" onClick={() => setShow(true)}>
                NYHETSBREV
            </Button>
             {/* A Modal component with the show state variable and onHide function */}
            <Modal
                show={show}
                onHide={() => setShow(false)} 
                dialogClassName="modal-90w"
                aria-labelledby="Newsletter"
            >
                {/* A Modal Header component with a close button and a title */}
                <Modal.Header closeButton>
                    <Modal.Title id="Newsletter">
                        Abonner På Vårt nyhetsbrev!
                    </Modal.Title>
                </Modal.Header>
                {/* A Modal Body component with a paragraph of text */}
                <Modal.Body>
                    <p>
                        Få siste nytt først! Abonner på vårt nyhetsbrev for å motta
                        spennende oppdateringer om våre produkter, tjenester og tilbud
                        rett til innboksen.
                    </p> 
                </Modal.Body>
                {/* A Modal Footer component with a Form and a Button */}
                <Modal.Footer>
                    <Form.Label>                      
                    </Form.Label>
                    <Form.Control
                type="email"
                placeholder="navn@eksempel.com"
                autoFocus
              />
                    <Button variant = "primary" style={{backgroundColor:'#0050B1'}}onClick={() => setShow(false)}>
                        Abonner
                    </Button>
                </Modal.Footer>
            </Modal>               
        </>       
    );
}

//The component is exported as a default export.
export default Newsletter;