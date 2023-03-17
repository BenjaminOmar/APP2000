import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function UserForm({ user, handleUpdateUser }) {
  const [formData, setFormData] = useState(user);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>Fornavn</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Etternavn</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="socialSecurityNumber">
        <Form.Label>Fødselsnummer</Form.Label>
        <Form.Control
          type="text"
          name="socialSecurityNumber"
          value={formData.socialSecurityNumber}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Lagre
      </Button>
    </Form>
  );
}

export default UserForm;
