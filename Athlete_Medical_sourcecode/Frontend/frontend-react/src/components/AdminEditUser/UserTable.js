import React from 'react';
import { Table } from 'react-bootstrap';

function UserTable({ users, handleSelectUser }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Fornavn</th>
          <th>Etternavn</th>
          <th>Fødselsnummer</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} onClick={() => handleSelectUser(user)}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.socialSecurityNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UserTable;
