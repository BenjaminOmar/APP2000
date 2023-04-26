import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import HeaderSpec from '../../components/SpecialistDashboard/HeaderSpec';
import { Table } from 'react-bootstrap';

const FindAppointment = () => {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);

  useEffect(() => {
    try {
      const specID = Cookies.get('userId');
  
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
    } catch (error) {
      console.log('Error retrieving user ID from cookies:', error);
    }
  }, []);

    return (
        <>
        <HeaderSpec/>
      <div style={{minHeight:'50vh'}}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}} >Oversikt over avtaler</h1>
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
              <td colSpan={7}><b>Fremtide avtaler</b></td>
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
              <td colSpan={7}><b>Dine ledige timer</b></td>
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


export default FindAppointment;
