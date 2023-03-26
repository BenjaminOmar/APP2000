import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Card, Form } from 'react-bootstrap';
import '../components/SeeAllJournals.css';


function SeeAllJournals() {
  const [journals, setJournals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('https://localhost:7209/api/journal/getAll')
      .then(response => {
        setJournals(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredJournals = journals.filter(journal => {
    return journal.journalnoteId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.journalnoteId.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="AllJournals">
      <div className="container d-flex justify-content-center">
        <div className="box">
          <h2>Oversikt over alle journalnotater</h2>
          <Form.Group controlId="searchForm">
            <Form.Control type="text" placeholder="Søk etter pasient eller journalnote ID" value={searchTerm} onChange={handleSearchTermChange} />
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Journalnote ID</th>
                <th>Journalnotat</th>
                <th>Tittel</th>
                <th>Opprettet</th>
                <th>Pasient</th>
              </tr>
            </thead>
            <tbody>
              {filteredJournals.map(journal => (
                <tr key={journal.journalnoteId}>
                  <td>{journal.journalnoteId}</td>
                  <td>{journal.journalnote}</td>
                  <td>{journal.heading}</td>
                  <td>{journal.created}</td>
                  <td>{journal.patient}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default SeeAllJournals;
