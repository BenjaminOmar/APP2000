import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import HeaderSpec from '../../components/SpecialistDashboard/HeaderSpec';
import { Table } from 'react-bootstrap';

const FindAppointment02 = () => {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    const specID = Cookies.get('userID');
    //const specID = 4;

    axios.get('https://localhost:7209/api/appointment/getAll')
      .then(response => {
        const allAppointments = response.data;
        const specialistAppointments = allAppointments.filter(appointment => appointment.specialistId === specID);
        const booked = specialistAppointments.filter(appointment => appointment.name !== null);
        const available = specialistAppointments.filter(appointment => appointment.name === null);
        setBookedAppointments(booked);
        setAvailableAppointments(available);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

    return (
        <>
        <HeaderSpec/>
      <div>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Oversikt over avtaler</h1>
        <Table className="mx-auto"
            //Style the table with striped rows, bordered cells and hover effects
            striped bordered hover
            // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
            style={{ width: '70%', marginBottom: '70px' }}
          >
          <thead>
            <tr>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Room ID</th> 
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7}><b>Booked Appointments</b></td>
            </tr>
            {bookedAppointments.map(appointment => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.roomId}</td>               
                <td>{appointment.name}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={7}><b>Available Appointments</b></td>
            </tr>
            {availableAppointments.map(appointment => (
              <tr key={appointment.appointmentId}>               
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.roomId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </>
    );
}


export default FindAppointment02;
