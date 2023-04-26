import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
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
    setSearchResults([]);
  };

  const handlePostNote = async (event) => {
    try {
      event.preventDefault();
      const newNote = {
        journalnote1: journalNote,
        heading: heading,
        //created: new Date().toISOString(),
        patient: selectedPatient.userId,
        specialist: specID,
      };
      await axios.post(`${API_URL}/`, newNote);
      setJournalNote('');
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error posting note:', error);
      // handle the error, for example:
      // show an error message to the user
    }
  };

  return (
    <>
      <HeaderSpec />
      <div style={{ minHeight: "75vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Skriv Journal</h1>
        <Form onSubmit={handleSearch}>
          <Form.Group controlId="search" className="mb-3">
            <Form.Label>Søk etter pasient</Form.Label>
            <Form.Control type="text" placeholder="Skriv inn pasientnavn" />
          </Form.Group>
          <Button type="submit">Søk</Button>
        </Form>
        {searchResults.length > 0 && (
          <Table>
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
      {selectedPatient && (
        <Form onSubmit={handlePostNote}>
           <Form.Group controlId="heading">
          <Form.Label>Skriv inn overskrift</Form.Label>
          <Form.Control
            type="text"
            value={heading}
            onChange={(event) => setHeading(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="journalNote">
          <Form.Label>Skriv journalnotat</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={journalNote}
            onChange={(event) => setJournalNote(event.target.value)}
          />
        </Form.Group>
        <Button type="submit">Lagre</Button>
      </Form>
      
      )}
    </div>
    </>
  )
}

export default WriteJournal;