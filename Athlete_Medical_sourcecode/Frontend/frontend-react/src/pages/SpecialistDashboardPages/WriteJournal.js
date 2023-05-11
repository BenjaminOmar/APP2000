import React, { useState } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

import HeaderSpec from '../../components/SpecialistDashboard/HeaderSpec';

const API_URL = 'https://localhost:7209/api/journal/create';
const USERS_API_URL = 'https://localhost:7209/api/user/getAll';

function WriteJournal() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [journalNote, setJournalNote] = useState('');
  const [heading, setHeading] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const specID = parseInt(Cookies.get('userId'), 10);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchQuery = event.target.search.value.toLowerCase();
    const response = await axios.get(`${USERS_API_URL}`);
    const matchingUsers = response.data.filter((user) => {
      const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`.toLowerCase();
      return fullName.includes(searchQuery);
    });
    setSearchResults(matchingUsers);
  };


  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true); // Set showModal to true when a patient is selected
    setSearchResults([]);
  };

  const handlePostNote = async (event) => {
    try {
      event.preventDefault();
      const newNote = {
        journalnote1: journalNote,
        heading: heading,
        patient: selectedPatient.userId,
        specialist: specID,
      };
      await axios.post(`${API_URL}/`, newNote);
      setJournalNote('');
      setSelectedPatient(null);
      handleNoteSaved(); 

    } catch (error) {
      setInfoMessage("Noe gikk galt i lagringen av notatet, error")
      setShowInfoModal("true"); 
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNoteSaved = () => {
    setShowModal(false);
    setShowInfoModal(true);
    setInfoMessage('Journalnotatet ble lagret');
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  return (
    <>
      <HeaderSpec />
      <div style={{ minHeight: 'calc(100vh - 390px)', display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ paddingTop: '50px', paddingBottom: '20px', }}>
          <h2> Søk pasient </h2>
        </div>        
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="search" className="mb-3">
            <Form.Control type="text" placeholder="Søk på navn" />
          </Form.Group>
          <Button type="submit" style={{ width: '300px', marginBottom: '30px' }}>Søk</Button>
        </Form>
        {searchResults.length > 0 && (
          <Table
            //Style the table with striped rows, bordered cells and hover effects
            striped bordered hover
            // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
            style={{ width: '70%', marginBottom: '70px' }}
          >
            <thead>
              <tr>
                <th>Fornavn</th>
                <th>Mellomnavn</th>
                <th>Etternavn</th>
                <th>E-post</th>
                <th>Adresse</th>
                <th>Telefonnummer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((result) => (
                <tr key={result.userId}>
                  <td>{result.firstName}</td>
                  <td>{result.middleName}</td>
                  <td>{result.lastName}</td>
                  <td>{result.email}</td>
                  <td>{result.adress}</td>
                  <td>{result.phoneNumber}</td>
                  <td >
                    <Button onClick={() => handleSelectPatient(result)} >Skriv journalnotat</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

<Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Skriv journalnotat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handlePostNote}>
              <Form.Group controlId="heading">
                <Form.Label>Skriv inn overskrift</Form.Label>
                <Form.Control 
                type="text" 
                value={heading} 
                onChange={(event) => setHeading(event.target.value)} 
                required                
                />
              </Form.Group>
              <Form.Group controlId="journalNote">
                <Form.Label>Skriv journalnotat</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={journalNote}
                  onChange={(event) => setJournalNote(event.target.value)}
                  required
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Avbryt
                </Button>
                <Button type="submit">Lagre</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
  <Modal.Header closeButton>
    <Modal.Title>Success</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>{infoMessage}</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseInfoModal}>
      Lukk
    </Button>
  </Modal.Footer>
</Modal>
      </div>
    </>
  )
}

export default WriteJournal;