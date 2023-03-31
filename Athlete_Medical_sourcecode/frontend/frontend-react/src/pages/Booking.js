import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";


function Booking() {

  const [specialist, setSpecialist] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState(null);


  useEffect(() => {
    axios.get('https://localhost:7209/api/user/getAll')
      .then(response => {
        const filteredUsers = response.data.filter(specialist => specialist.roleId === 2);
        setSpecialist(filteredUsers);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleShowAvailableAppointments = (selectedSpecialist) => {
    axios.get(`https://localhost:7209/api/appointment/available`)
      .then(response => {
        const filteredAppointments = response.data.filter(appointment => appointment.specialistId === selectedSpecialist.userId);
        setAvailableAppointments(filteredAppointments);
        setSelectedSpecialist(selectedSpecialist);
        
      })
      .catch(error => {
        console.error(error);
      });
  };
  


  return (
    <>
      <HeaderAdmin />
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {specialist.map((specialist) => (
            <tr key={specialist.userId}>
              <td>{specialist.firstName}</td>
              <td>{specialist.lastName}</td>
              <td>{specialist.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowAvailableAppointments(specialist)}
                >
                  Se ledige avtaler
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {availableAppointments !== null && selectedSpecialist !== null && (
      <>
        <h2>{`${selectedSpecialist.firstName} ${selectedSpecialist.lastName}'s Ledige Avtaler`}</h2>
        <Table>
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room ID</th>
              <th>Patient ID</th>
              <th>Specialist ID</th>
            </tr>
          </thead>
          <tbody>
            {availableAppointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.roomId}</td>
                <td>{appointment.patientId}</td>
                <td>{appointment.specialistId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    )}
  </>
);
   
}

export default Booking;
