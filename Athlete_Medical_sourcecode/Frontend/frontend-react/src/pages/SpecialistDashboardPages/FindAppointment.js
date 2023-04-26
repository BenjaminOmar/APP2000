import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import HeaderSpec from '../../components/SpecialistDashboard/HeaderSpec';
import { Table } from 'react-bootstrap';

const FindAppointment = () => {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    const specID = parseInt(Cookies.get('userId'), 10);

    console.log(specID);
    
    // Fetch booked appointments
    axios.get('https://localhost:7209/api/appointment/getAll')
      .then(response => {
        console.log(response);
        const allAppointments = response.data;
        const specialistAppointments = allAppointments.filter(appointment => appointment.specialistId === specID);
        const booked = specialistAppointments.filter(appointment => appointment.name !== null);
        setBookedAppointments(booked);
      })
      .catch(error => {
        console.log(error);
      });
    
    // Fetch available appointments
    axios.get(`https://localhost:7209/api/appointment/available/specId?specId=${specID}`)
    //axios.get('https://localhost:7209/api/appointment/available/specId?specId=11')
      .then(response => {
        console.log(response);
        const available = response.data.filter(appointment => appointment.isAvailable === 1);
        setAvailableAppointments(available);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <HeaderSpec/>
      <div style={{minHeight:'50vh'}}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Oversikt over avtaler</h1>
        <Table className="mx-auto"
            //Style the table with striped rows, bordered cells and hover effects
            striped bordered hover
            // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
            style={{ width: '70%', marginBottom: '70px' }}
          >
          <thead>
            <tr>
              <th>Starts</th>
              <th>Sluttes</th>
              <th>Rom nummer</th> 
              <th>Navn på pasient</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4}><b>Fremtide avtaler</b></td>
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
              <td colSpan={4}><b>Dine ledige timer</b></td>
            </tr>
            {availableAppointments.map(appointment => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.startTime}</td>
                <td>{appointment.endTime}</td>
                <td>{appointment.roomId}</td>
                <td>{appointment.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default FindAppointment;
