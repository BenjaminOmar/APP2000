import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Card, Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import '../components/SeeAllJournals.css';

function AdminSeeJournal() {
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
      <div className="AllJournals">
        <div className="container d-flex justify-content-center">
          <div className="box">
            <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
              <h2>Velkommen {username} </h2>
            </div>  
            <Card>
              <Card.Header style={{ textAlign: "center" }} as="h5">Søk i journaler</Card.Header>
              <Card.Body>
                <Card.Text style={{ paddingRight:'12%', paddingLeft: '12%' }}>
                  Her kan du søke etter en journal ved å skrive inn en tekst i søkefeltet under. Søket vil returnere alle journalnotater som inneholder den angitte teksten i tittel eller innhold. 
                  Du kan finne en journal ved å søke etter pasient ID, navn på pasient, eller tittel på journal.
                </Card.Text>
              </Card.Body>
            </Card>
            <Form.Group className="mb-3" style={{ marginLeft: "39%", marginRight: "40%" }}>
              <Form.Control
                type="text"
                placeholder="Søk etter en journal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Button onClick={searchJournals} style={{ marginLeft: "40%", width: "19%", marginBottom: "50px" }}>
              Søk
            </Button>
  
            {searchResults.length > 0 && (
              <Table striped bordered hover style={{ width: "70%", marginLeft: "12%", marginBottom: "100px" }}>
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
          </div>
        </div>
      </div>
    </>
  );

  
}

export default AdminSeeJournal;