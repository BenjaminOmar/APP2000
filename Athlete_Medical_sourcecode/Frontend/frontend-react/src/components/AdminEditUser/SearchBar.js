import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

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
    <Form onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Søk etter bruker"
        value={searchTerm}
        onChange={handleChange}
      />
    </Form>
  );
}

export default SearchBar;
