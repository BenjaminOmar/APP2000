import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';


function SeeAllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');

  useEffect(() => {
    axios.get('https://localhost:7209/api/appointment/getAll')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="AllAppointments">
    <div className="container d-flex justify-content-center">
      <div className="box">
        <h2>Oversikt over alle avtaler</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Starttid</th>
              <th>Sluttid</th>
              <th>Spesialist</th>
              <th>Pasient</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.specialistId}</td>
                <td>{appointment.patientId} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
    </div>
  );
}

export default SeeAllAppointments;