import React, { useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";

function GetJournal() {
  const [searchTerm, setSearchTerm] = useState("");
  const [journalNote, setJournalNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://localhost:7209/api/journal/getAll?name=${searchTerm}`);
      const data = await response.json();
      if (data.length > 0) {
        setJournalNote(data[0]);
        setShowModal(true);
      } else {
        alert("Ingen journalnotater funnet.");
      }
    } catch (error) {
      console.error(error);
      alert("Noe gikk galt. Vennligst prøv igjen senere.");
    }
  };

  const handleClose = () => {
    setJournalNote(null);
    setShowModal(false);
    setSearchTerm("");
  };
  

  return (
    <>
    <HeaderSpec/>
    <style>
      min
    </style>
    <div className="d-flex justify-content-center" style={{minHeight: "50vh"}}>
    <Form className="w-50">
      <h2 className="text-center mb-4">Søk journal</h2>
      <Form.Group controlId="searchTerm">
        <Form.Control
        type="text"
        placeholder="fornavn middelnavn etternavn"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
  <div className="d-flex justify-content-center mb-4">
    <Button variant="primary" onClick={handleSearch}>
      Søk
    </Button>
  </div>
</Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{journalNote?.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Pasientnavn:</td>
                <td>{journalNote?.name}</td>
              </tr>
              <tr>
                <td>Dato opprettet:</td>
                <td>{journalNote?.created}</td>
              </tr>
              <tr>
                <td>Journalnotat:</td>
                <td>{journalNote?.journalnote}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default GetJournal;
