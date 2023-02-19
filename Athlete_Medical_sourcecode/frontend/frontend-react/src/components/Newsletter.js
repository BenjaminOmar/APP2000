import React, {useState} from "react";
import {Button} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {Form} from "react-bootstrap";
import './Newsletter.css'

function Newsletter(){

const [show, setShow] = useState(false);

    return(
        <>
            <Button className="sidebar" style={{backgroundColor:'#0050B1'}} variant="primary" onClick={() => setShow(true)}>
                NYHETSBREV
            </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)} 
                dialogClassName="modal-90w"
                aria-labelledby="Newsletter"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="Newsletter">
                        Abonner På Vårt nyhetsbrev!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Få siste nytt først! Abonner på vårt nyhetsbrev for å motta
                        spennende oppdateringer om våre produkter, tjenester og tilbud
                        rett til innboksen.
                    </p> 
                </Modal.Body>
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

export default Newsletter;