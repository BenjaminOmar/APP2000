import HeaderAdmin from "../../components/AdminDashboard/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Card, Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import '../../components/SeeAllJournals.css';

function AdminSeeAppointment() {
  const username = Cookies.get("username");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedJournalnote, setSelectedJournalnote] = useState("");
  const [showModal, setShowModal] = useState(false);


  const searchJournals = async (event) => {
    event.preventDefault();
    try{
      const response = await axios.get("https://localhost:7209/api/journal/getAll");
      const data = response.data;
      const filteredResults = data.filter(
        (journal) =>
          journal.journalnote.toLowerCase().includes(searchTerm.toLowerCase()) ||
          journal.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
          journal.patient.toString().includes(searchTerm) ||
          journal.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.log(error);
    };    
  }

  return (
    <>
       <HeaderAdmin />
      {/* Create a div with padding at the top and bottom and display a welcome message with the username */}
      <div style={{ paddingTop: '50px', paddingBottom: '30px', }}>
        <h2>Søk etter avtaler</h2>
      </div>
            {/* Create a Form.Group component with margin on the left and right */}
      <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Create a Form.Control component with a text type, placeholder text, value, and onChange function */}
        <Form.Control
          style={{ width: '22%' }}
          type="text"
          placeholder="Søk på navn, journaltittel eller pasient ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {/* Create a Button component with a onClick function, margin on the left, width, and marginBottom */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={searchJournals} style={{ width: '15%', marginBottom: '70px' }}>Search</Button>
      </div>
  
           
      {searchResults.length > 0 && (
        // Render a table only if there are search results
        <div style={{marginBottom: '70px'}}>
          <Table className="mx-auto"
            //Style the table with striped rows, bordered cells and hover effects
            striped bordered hover
            // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
            style={{ width: '70%', marginBottom: '70px' }} >
                <thead>
                  <tr>
                    <th>Journal ID</th>
                    <th>Tittel</th>
                    <th>Opprettet</th>
                    <th>Pasient ID</th>
                    <th>Pasientnavn</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((journal) => (
                    <tr key={journal.journalnoteId}>
                      <td>{journal.journalnoteId}</td>
                      <td>{journal.heading}</td>
                      <td>{new Date(journal.created).toLocaleString()}</td>
                      <td>{journal.patient}</td>
                      <td>{journal.name}</td>
                      <td>
                        <Button onClick={() => setSelectedJournalnote(journal.journalnote)}>Vis Journalnotat</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              </div>
            )}
            {selectedJournalnote !== "" && (
              <Modal show={true} onHide={() => setSelectedJournalnote("")}>
                <Modal.Header closeButton>
                  <Modal.Title>Journalnotat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedJournalnote}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setSelectedJournalnote("")}>
                    Lukk
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
    </>
  );

  
}

export default AdminSeeAppointment;