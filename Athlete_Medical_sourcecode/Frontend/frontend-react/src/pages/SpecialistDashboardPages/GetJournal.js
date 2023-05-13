// This code is a React component called `GetJournal` that implements a search 
// functionality for patient journals. It allows the user to search for patients by 
// their first name, last name, or social security number. 
// The search results are displayed in a table with pagination support. 
// When a user is selected from the search results, their corresponding 
// journals are fetched from an API and displayed in another table. 
// Clicking on a journal opens a modal displaying the journal details. E
// error messages are also handled and displayed in a separate modal.

//These lines import the necessary dependencies and components required for the code to function.
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { Button, Form, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";

function GetJournal() {
  // Define state variables using the useState hook
  // Search term inputted by the user
  const [searchTerm, setSearchTerm] = useState("");
  // Results of the search
  const [searchResults, setSearchResults] = useState([]);
  // Set the initial current table page to 1
  const [currentPage, setCurrentPage] = useState(1);
  // Define the number of table items to display per page
  const pageSize = 25;
  // Calculate the index of the first item to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  // Calculate the index of the last item to display on the current page
  const endIndex = startIndex + pageSize;
  // Message for displaying information or error
  const [infoMessage, setInfoMessage] = useState('');
   // Control showing/hiding information modal
  const [showInfoModal, setShowInfoModal] = useState(false);
  // Currently selected user
  const [selectedUser, setSelectedUser] = useState(null);
  // Journals associated with the selected user
  const [journals, setJournals] = useState([]);
  // Initializing a state variable 'modal' as 'false', 
  //and its corresponding state update function 'setModal'
  const [modal, setModal] = useState(false);
  // Initializing a state variable 'selectedJournal' as 'null', 
  //and its corresponding state update function 'setSelectedJournal'
  const [selectedJournal, setSelectedJournal] = useState(null);
  // Parsing the 'userId' cookie value retrieved from js-cookie as an integer


  // Define an asynchronous function to search for users
  const searchUsers = async (event) => {
    event.preventDefault();// Prevent the default form submission behavior
    try {
      const response = await axios.get("https://localhost:7209/api/user/patients"); // Send a GET request to the API to retrieve all users
      const data = response.data;// Extract the data from the response
      const filteredResults = response.data.filter(
        // Filter the data based on the search term
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the first name includes the search term (ignoring case)
          user.middleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the middle name (if it exists) includes the search term (ignoring case)
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the last name includes the search term (ignoring case)
          user.socialSecurityNum.includes(searchTerm) &&// Check if the social security number includes the search term
          user.roleId === 1
      );
      setSearchResults(filteredResults);// Update the search results state variable with the filtered results
    } catch (error) {
      setInfoMessage(error); // Set the error message from backend api
      setShowInfoModal(true); // Show the info modal with error message
      //Return false if validation fails
      return false;
    };
  }
  // Define a function to handle page changes
  const handlePageChange = (pageNumber) => {
    // Update the current page to the selected page number
    setCurrentPage(pageNumber);
  }

  //Define a n asynchronous function to find selected users journal. 
  const handleShowJournalDetails = async (user) => {
    // Set the selected user in state
    setSelectedUser(user);// Set the selected user in stat
    try {
      // Send a GET request to retrieve all journals
      const response = await axios.get(`https://localhost:7209/api/journal/getAll`);
      // Extract the data from the response
      const data = response.data;
      // Filter the journals based on the user's ID
      const userJournals = data.filter((journal) => journal.patient === user.userId);
      // Update the journals state variable with the filtered journals
      setJournals(userJournals);
    } catch (error) {
      // Set the error message for journal retrieval
      setInfoMessage("Feil under henting av journaler");
      // Show the info modal with the error message
      setShowInfoModal(true);
    }
  };
  // Defining a function 'toggleModal' that toggles the value of the 'modal' state variable
  const toggleModal = () => {
    console.log("Modal state before toggle:", modal);
    setModal(!modal);
  };

  // Defining a function 'handleJournalClick' that updates the 'selectedJournal' 
  //state variable to the clicked journal, and toggles the 'modal' state variable
  const handleJournalClick = (journal) => {
    console.log("Journal clicked:", journal);
    setSelectedJournal(journal);
    toggleModal(true);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 275px)', paddingBottom: "200px" }}>
      {/* Render the HeaderAdmin component */}
      <HeaderSpec />
      {/* Create a div with padding at the top and bottom and display a welcome message with the username */}
      <div style={{ paddingTop: '50px', paddingBottom: '30px', }}>
        <h2> Søk pasient journal </h2>
      </div>

      {/* Create a Form.Group component with margin on the left and right */}
      <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Create a Form.Control component with a text type, placeholder text, value, and onChange function */}
        <Form.Control
          style={{ width: '22%' }}
          type="text"
          placeholder="Søk på fornavn, etternavn eller personnummer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {/* Create a Button component with a onClick function, margin on the left, width, and marginBottom */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={searchUsers} style={{ width: '15%', marginBottom: '30px' }}>Søk</Button>
      </div>

      {searchResults.length > 0 && (
        // Render a table only if there are search results
        <div>
          <Table className="mx-auto"
            //Style the table with striped rows, bordered cells and hover effects
            striped bordered hover
            // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
            style={{ width: '70%', marginBottom: '70px' }}
          >
            <thead>
              <tr>
                {/* Create table headers */}
                <th>Brukernavn</th>
                <th>Fornavn</th>
                <th>Mellomnavn</th>
                <th>Etternavn</th>
                <th>Telefonnummer</th>
                <th>Epost</th>
                <th>Journal</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through each user object in the searchResults array, showing 25 users at a time */}
              {searchResults.slice(startIndex, endIndex).map((user) => (
                // Render a table row for each user object, with a unique key based on its userId
                <tr key={user.userId}>
                  {/* Display the user's information in each table cell */}
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.middleName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button onClick={() => {
                      handleShowJournalDetails(user);
                    }}> Journal</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Render a pagination component to allow the user to navigate between pages if there is more than 25 users in the table */}
          <Pagination
            size="sm"
            className="justify-content-center" // Center the pagination component horizontally
            activePage={currentPage} // Set the active page to the current page
            itemsCountPerPage={pageSize} // Set the number of items per page to the page size constant
            totalItemsCount={searchResults.length}// Set the total number of items in the search results array as the total items count
            onChange={handlePageChange} // Call the handlePageChange function when the active page is changed
          />
        </div>
      )}
      {/* Check if selectedUser is truthy and render the following code block if it is. */}
      {selectedUser && (
        // Create a centered container div for the journal section.
        <div style={{ textAlign: "center" }}>
          {/* Display the header with the selected user's first and last name. */}
          <h3 style={{ marginBottom: '30px' }}>Journal for {selectedUser.firstName} {selectedUser.lastName}</h3>
          {/* Render a paragraph if the journals array is empty, indicating that the patient has no journals. */}
          {journals.length === 0 && <p>Pasienten har ingen journal</p>}
          {/* Check if the journals array has entries and render the following code block if it does. */}
          {journals.length > 0 && (
            //  Create a table with specific styling properties.
            <Table className="mx-auto" striped bordered hover style={{ width: '70%', marginBottom: '70px' }}>
              {/* Start the table header section. */}
              <thead>
              {/* Start a table row. */}
                <tr>
                {/* Display the table headers. */}
                  <th>Dato</th>
                  <th>Overskrift</th>
                </tr>
              </thead>
              {/* Start the table body section */}
              <tbody>
              {/* Map over the journals array and render a table row for each journal. */}
                {journals.map((journal) => (
                  // Start a table row with a unique key based on the journal's ID.
                  <tr key={journal.journalnoteId}>
                    {/* Display the formatted creation date of the journal. */}
                    <td>{new Date(journal.created).toLocaleString()}</td>
                    {/* Display the heading of the journal. */}
                    <td>{journal.heading}</td>
                    {/* Display a button that triggers the handleJournalClick function when clicked, passing the corresponding journal as an argument. */}
                    <td>
                      <Button onClick={() => handleJournalClick(journal)}>Vis mer</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          <Pagination
            size="sm"
            className="justify-content-center" // Center the pagination component horizontally
            activePage={currentPage} // Set the active page to the current page
            itemsCountPerPage={pageSize} // Set the number of items per page to the page size constant
            totalItemsCount={searchResults.length}// Set the total number of items in the search results array as the total items count
            onChange={handlePageChange} // Call the handlePageChange function when the active page is changed
          />
        </div>
      )}
      {/* If there is a selected journal, render the following code */}
      {selectedJournal && (
        // Start of a modal with a toggle function
        <Modal show={modal} toggle={toggleModal}>
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
    </div>
  );
}
//The component is exported as a default export
export default GetJournal;

