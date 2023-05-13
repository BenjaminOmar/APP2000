// This code represents a React component called WriteJournal. It is responsible for rendering a 
// form where a specialist can search for a patient and write journal notes for them.
// When the specialist enters a search query and submits the form, the code performs a search 
// operation and displays the matching users in a table. The specialist can select a patient from the table, 
// which opens a modal where they can write a journal note with a heading and content. 
// When the specialist saves the note, it sends a POST request to the API to store the note in the journal. 
//If successful, it displays a success message in another modal.

// Importing React, useState from the 'react' package
import React, { useState } from 'react';
// Importing some UI components from the 'react-bootstrap' package
import { Form, Button, Table, Modal } from 'react-bootstrap';
// Importing 'axios' package for making HTTP requests
import axios from 'axios';
// Importing 'js-cookie' package for handling cookies
import Cookies from 'js-cookie';
// Importing the 'HeaderSpec' component from a local file
import HeaderSpec from '../../components/SpecialistDashboard/HeaderSpec';

function WriteJournal() {
  // Define the API endpoints
  const API_URL = 'https://localhost:7209/api/journal/create';
  const USERS_API_URL = 'https://localhost:7209/api/user/getAll';
  // Define state variables using the useState hook
  // Stores the search results
  const [searchResults, setSearchResults] = useState([]);
  // Stores the selected patient
  const [selectedPatient, setSelectedPatient] = useState(null);
  // Stores the journal note content
  const [journalNote, setJournalNote] = useState('');
  // Stores the heading of the journal note
  const [heading, setHeading] = useState('');
  // Controls the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // Controls the visibility of the info modal
  const [showInfoModal, setShowInfoModal] = useState(false);
  // Stores the info message
  const [infoMessage, setInfoMessage] = useState('');
  // Get the specialist ID from the cookies
  const specID = parseInt(Cookies.get('userId'), 10);

  // Handle the search operation
  const handleSearch = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the search query from the form input and convert it to lowercase
    const searchQuery = event.target.search.value.toLowerCase();
    // Send a GET request to the USERS_API_URL and wait for the response
    const response = await axios.get(`${USERS_API_URL}`);
    // Filter the response data to find users whose full name includes the search query
    const matchingUsers = response.data.filter((user) => {
      // Construct the full name by combining the first name, middle name, and last name
      const fullName = `${user.firstName} ${user.middleName} ${user.lastName}`.toLowerCase();
      // Check if the full name includes the search query
      return fullName.includes(searchQuery);
    });
    // Set the search results state to the matching users
    setSearchResults(matchingUsers);
  };

  // Handle the select patient operation
  const handleSelectPatient = (patient) => {
    // Set the selected patient state to the provided patient object
    setSelectedPatient(patient);
    // Set showModal state to true when a patient is selected
    setShowModal(true);
    // Clear the search results array
    setSearchResults([]);
  };

  //Handle the poste note operation
  const handlePostNote = async (event) => {
    try {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Create a new note object with the journalNote, heading, selectedPatient, and specID values
      const newNote = {
        journalnote1: journalNote,
        heading: heading,
        patient: selectedPatient.userId,
        specialist: specID,
      };
      // Send a POST request to the API_URL with the newNote data
      await axios.post(`${API_URL}/`, newNote);
      // Clear the journalNote state
      setJournalNote('');
      // Clear the selectedPatient state
      setSelectedPatient(null);
      // Call the handleNoteSaved function
      handleNoteSaved();
    } catch (error) {
      // If an error occurs, set the infoMessage state to display an error message
      setInfoMessage("Noe gikk galt i lagringen av notatet, error")
      // Set the showModal state to true to display the info modal
      setShowInfoModal("true");
    }
  };

  // Handle the close modal operation
  const handleCloseModal = () => {
    // Set the showModal state to false to close the modal
    setShowModal(false);
  };

  //Handle the save note message
  const handleNoteSaved = () => {
    // Set the showModal state to false to close the modal
    setShowModal(false);
    // Set the showInfoModal state to true to display the info modal
    setShowInfoModal(true);
    // Set the infoMessage state to display a success message
    setInfoMessage('Journalnotatet ble lagret');
  };

  //Handle the close info modal operation
  const handleCloseInfoModal = () => {
    // Set the showInfoModal state to false to close the info modal
    setShowInfoModal(false);
  };

  //starting point of the returned code block
  return (
    <>
      {/* Render the HeaderSpec component */}
      <HeaderSpec />
      {/* Div element with styling for minHeight, display, flexDirection, and alignItems */}
      <div style={{ minHeight: 'calc(100vh - 390px)', display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Div element with styling for paddingTop and paddingBottom */}
        <div style={{ paddingTop: '50px', paddingBottom: '20px', }}>
          {/* Render an h2 element with the text "Søk pasient" */}
          <h2> Søk pasient </h2>
        </div>
        {/* Render a form element with the handleSearch function as the onSubmit event handler */}
        <Form onSubmit={handleSearch}>
          {/* Create a form group with the controlId of "search" and a className of "mb-3" */}
          <Form.Group controlId="search" className="mb-3">
            {/* Render a form control input with the type "text" and a placeholder text "Søk på navn" */}
            <Form.Control type="text" placeholder="Søk på navn" />
          </Form.Group>
          {/* Render a submit button with the text "Søk" and styling for width and marginBottom */}
          <Button type="submit" style={{ width: '300px', marginBottom: '30px' }}>Søk</Button>
        </Form>
        {/* Check if the length of searchResults is greater than 0 */}
        {searchResults.length > 0 && (
          // Render a table element
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
              {/* Iterate over each item in searchResults and map it to a table row */}
              {searchResults.map((result) => (
                <tr key={result.userId}>
                  <td>{result.firstName}</td>
                  <td>{result.middleName}</td>
                  <td>{result.lastName}</td>
                  <td>{result.email}</td>
                  <td>{result.adress}</td>
                  <td>{result.phoneNumber}</td>
                  <td >
                    {/* Button element attached with  an onClick event handler that calls handleSelectPatient function with the result parameter */}
                    <Button onClick={() => handleSelectPatient(result)} >Skriv journalnotat</Button>
                  </td>
                </tr>
                // Close the map function, indicating the end of the iteration over searchResults array
              ))}
            </tbody>
          </Table>
          // Close the conditional rendering check for searchResults length
        )}
        {/* A Modal component with the show prop set to the value of showModal state and onHide prop set to handleCloseModal function */}
        <Modal show={showModal} onHide={handleCloseModal}>
          {/* Render the header section of the modal with a close button */}
          <Modal.Header closeButton>
            {/* Render the title of the modal */}
            <Modal.Title>Skriv journalnotat</Modal.Title>
          </Modal.Header>
          {/* Render the body section of the modal */}
          <Modal.Body>
            {/* Render a form element with the handlePostNote function as the onSubmit event handler */}
            <Form onSubmit={handlePostNote}>
              <Form.Group controlId="heading">
                <Form.Label>Skriv inn overskrift</Form.Label>
                {/* Render an input field with the type "text", value bound to the heading state, and an onChange event handler 
                to update the heading state */}
                <Form.Control
                  type="text"
                  value={heading}
                  onChange={(event) => setHeading(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="journalNote">
                <Form.Label>Skriv journalnotat</Form.Label>
                {/* Render a textarea field with the specified number of rows, value bound to the journalNote state, 
                and an onChange event handler to update the journalNote state */}
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={journalNote}
                  onChange={(event) => setJournalNote(event.target.value)}
                  required
                />
              </Form.Group>
              <Modal.Footer>
                {/* Render a secondary button with the text "Avbryt" and an onClick event handler that calls handleCloseModal function */}
                <Button variant="secondary" onClick={handleCloseModal}>
                  Avbryt
                </Button>
                {/* Render a button with the text "Lagre" and a type of "submit" */}
                <Button type="submit">Lagre</Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        {/* Render a Modal component with the show prop set to the value of 
        showInfoModal state and onHide prop set to handleCloseInfoModal function */}
        <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
          <Modal.Header closeButton>
            <Modal.Title>Suksess</Modal.Title>
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
    // Close the return statement
  )
}
// Export the WriteJournal component as the default export
export default WriteJournal;