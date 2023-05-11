// Importing required dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// Importing the HeaderUser component
import HeaderUser from '../../components/UserDashboard/HeaderUser';

// Defining the functional component 'UserJournal'
const UserJournal = () => {
  // Initializing a state variable 'journals' as an empty array, 
  //and its corresponding state update function 'setJournals'
  const [journals, setJournals] = useState([]);
  // Initializing a state variable 'modal' as 'false', 
  //and its corresponding state update function 'setModal'
  const [modal, setModal] = useState(false);
  // Initializing a state variable 'selectedJournal' as 'null', 
  //and its corresponding state update function 'setSelectedJournal'
  const [selectedJournal, setSelectedJournal] = useState(null);
  // Parsing the 'userId' cookie value retrieved from js-cookie as an integer
  const userId = parseInt(Cookies.get('userId'));
  //State variable for storing the information message in the info modal
  const [infoMessage, setInfoMessage] = useState('');
  //State variable for showing/hiding the info modal. 
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Defining a side-effect using the useEffect hook
  useEffect(() => {
    // Making a GET request to the specified endpoint using axios
    axios.get('https://localhost:7209/api/journal/getAll')
      // Filtering the response data to include only journals for the current user
      .then(response => {
        const filteredJournals = response.data.filter(journal => journal.patient === userId);
        // Updating the 'journals' state variable with the filtered data
        setJournals(filteredJournals);
      })
      // Handling any errors that occurred during the GET request
      .catch(error => {
        setInfoMessage(error); // Set the error message from backend api
        setShowInfoModal(true); // Show the info modal with error message
        //Return false if validation fails
        return false;
      });
    // Specifying the dependency array for the useEffect hook, which triggers the side-effect when the 'userId' value changes
  }, [userId]);

  // Defining a function 'toggleModal' that toggles the value of the 'modal' state variable
  const toggleModal = () => {
    setModal(!modal);
  };

  // Defining a function 'handleJournalClick' that updates the 'selectedJournal' 
  //state variable to the clicked journal, and toggles the 'modal' state variable
  const handleJournalClick = (journal) => {
    setSelectedJournal(journal);
    toggleModal();
  };

  return (
    <>
      {/* Rendering the HeaderUser component */}
      <HeaderUser />
      {/* Rendering a Bootstrap Container component */}
      <Container className="my-3" style={{ minHeight: 'calc(100vh - 425px)', paddingTop: '50px', }}>
        {/* Rendering a message when there are no journals */}
        {journals.length === 0 && <p>Du har ingen journaler</p>}
        {/*  If there are journals in the array, render the following code */}
        {journals.length > 0 && (
          // Table element with header, rows and columns
          <Table>
            <thead>
              <tr>
                <th>Dato</th>
                <th>Overskrift</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {journals.map(journal => (
                <tr key={journal.journalnoteId}>
                  <td>{new Date(journal.created).toLocaleString()}</td>
                  <td>{journal.heading}</td>
                  {/* Third column with a button to show more details of the journal */}
                  <td>
                    <Button onClick={() => handleJournalClick(journal)}>Vis mer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {/* If there is a selected journal, render the following code */}
        {selectedJournal && (
          // Start of a modal with a toggle function
          <Modal isOpen={modal} toggle={toggleModal}>
            {/* Modal header with the selected journal heading */}
            <ModalHeader toggle={toggleModal}>{selectedJournal.heading}</ModalHeader>
            {/* Modal body with the selected journal note */}
            <ModalBody>
              {selectedJournal.journalnote}
            </ModalBody>
            {/* Modal footer with a close button */}
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Lukk</Button>
            </ModalFooter>
          </Modal>
        )}
      </Container>
      {/* A modal that shows error messages */}
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
    </>
  );
};
//The component is exported as a default export
export default UserJournal;
