import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import styles from './FindAppointment.module.css';
import HeaderSpec from '../../components/SpecialistDashboard/HeaderSpec';

function FindAppointment() {
  const [appointments, setAppointments] = useState([]);
  const specialistId = Cookies.get('userId');
  

  useEffect(() => {
    fetch(`https://localhost:7209/api/appointment/available/specId?specId=${specialistId}`)
      .then(response => response.json())
      .then(data => setAppointments(data));
  }, [specialistId]);

  const formatDate = (date, index) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const start = new Date(date.startTime).toLocaleDateString('en-US', options);
    const end = new Date(date.endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return `Appointment ${index + 1} - ${start} ${end}`;
  };
  

  return (
    <>
      <HeaderSpec/>
    <div className={styles.appointmentListContainer}>
      <h2>Appointments</h2>
      <ul className={styles.appointmentList}>
          {appointments.map((appointment, index) => (
          <li key={appointment.appointmentId} className={styles.appointmentItem}>
            <span className={styles.appointmentTime}>{formatDate(appointment, index)}</span>
          </li>
        ))}
      </ul>


    </div>
    </>
  
  );
}

export default FindAppointment;
