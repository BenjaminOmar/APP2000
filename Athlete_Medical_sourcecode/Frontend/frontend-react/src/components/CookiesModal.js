//This code defines a a functional component 'CookiesModal' Its purpose is to display a modal window with information about 
//cookies and give the user the option to either accept or decline the use of cookies in the webb application. 
//

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const CookiesModal = () => {
  // useState hook to keep track of the visibility of the modal
  const [show, setShow] = useState(false);

  // useEffect hook to check if the user has already accepted cookies
  useEffect(() => {
    // check if the cookiesAccepted value is present in localStorage
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      // if not, show the modal
      setShow(true);
    }
  }, []);

  // function to handle the user accepting cookies
  const handleAccept = () => {
    // hide the modal
    setShow(false);
    // set the cookiesAccepted value in localStorage to true
    localStorage.setItem("cookiesAccepted", true);
  };

  // function to handle the user declining cookies
  const handleDecline = () => {
    // hide the modal
    setShow(false);
    // set the cookiesAccepted value in localStorage to false
    localStorage.setItem("cookiesAccepted", false);
    // redirect the user to a different page
    };

  // render the modal component
  return (
    //show and hide the modal props
    <Modal show={show} onHide={handleAccept}>
      <Modal.Header closeButton>
        <Modal.Title>Informasjonskapsler</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
            Vi bruker nødvendige informasjonskapsler for å sikre at du kan logge inn og bruke 
            funksjonaliteten til nettstedet vårt.
        </p>
        <p>
        Du kan velge å avvise informasjonskapsler ved å klikke på "Avslå"-knappen nedenfor. 
        Vær oppmerksom på at dette kan begrense funksjonaliteten til nettstedet vårt
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:'#0050B1'}} variant="secondary" onClick={handleDecline}>
          Avslå
        </Button>
        <Button style={{backgroundColor:'#0050B1'}} variant="primary" onClick={handleAccept}>
          Godkjenn
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

//allows the modal to be used in other part of the codebase. 
export  {CookiesModal};
