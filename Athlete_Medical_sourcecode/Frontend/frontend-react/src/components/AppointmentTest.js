import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Appointment.css";

function Appointment() {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  
  useEffect(() => {
    axios.get('https://localhost:7209/api/User/specialists')
      .then(response => {
        setSpecialists(response.data);
      })  
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSpecialistChange = event => {
    setSelectedSpecialist(event.target.value);
    setSelectedAppointment('');
    if (event.target.value) {
      axios.get(`https://localhost:7209/api/appointment/available?specialistId=${event.target.value}&isAvailable=1`)
        .then(response => {
          setAvailableAppointments(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setAvailableAppointments([]);
    }
  };
  

  const handleAppointmentChange = event => {
    setSelectedAppointment(event.target.value);
  };

  const bookAppointment = appointmentId => {
    const loggedInPatientId = 1; 
    axios.post('https://localhost:7209/api/appointment/book', {
      appointmentId,
      patientId: loggedInPatientId
    })
      .then(response => {
        alert('Time er booket!');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleBooking = event => {
    event.preventDefault();
    bookAppointment(selectedAppointment);
    setSelectedSpecialist('');
    setSelectedAppointment('');
    setAvailableAppointments([]);
  };

  return (
    <div className="appointment-container">
    <div className="appointment-system">
    <div>
      <h1>Timebestilling</h1>
      <form onSubmit={handleBooking}>
        <div>
          <label>Spesialist:</label>
          <select value={selectedSpecialist} onChange={handleSpecialistChange}>
            <option value="">Velg spesialist</option>
            {specialists.map(specialist => (
              <option key={specialist.id} value={specialist.id}>
                   {`${specialist.firstName} ${specialist.middleName} ${specialist.lastName}`}
              </option>
            ))}
          </select>
        </div>
        {selectedSpecialist && (
          <div>
            <label>Avtaletidspunkt:</label>
            <select value={selectedAppointment} onChange={handleAppointmentChange}>
              <option value="">Velg avtaletidspunkt</option>
              {availableAppointments.map(appointment => (
                <option key={appointment.id} value={appointment.id}>{appointment.startTime}</option>
              ))}
            </select>
          </div>
        )}
        {selectedAppointment && (
          <button type="submit">Bestill time</button>
        )}
      </form>
    </div>
    </div>
    </div>
  );
}

export default Appointment;