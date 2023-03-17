import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Form style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Card style={{padding: "2%"}}>
 <Form.Group className='mb-3' >
        <Form.Label>
          <p>Skriv inn fornavn, etternavn eller fødselsnummer for å søke etter bruker</p>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Søk etter bruker"
          value={searchTerm}
         onChange={handleChange}
        />
      </Form.Group>        
      <Button variant= "primary" type="submit" onChange={handleSubmit}>
        Søk
      </Button> 

      </Card>
        
    </Form>
  );
}

export default SearchBar;

