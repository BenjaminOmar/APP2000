import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Appointment.css";

function Appointment() {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [appointmentsBySpecialist, setAppointmentsBySpecialist] = useState({});

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
    const specialistId = event.target.value;
    setSelectedSpecialist(specialistId);
    setSelectedAppointment('');
    if (specialistId) {
      axios.get(`https://localhost:7209/api/appointment/available?specialistId=${specialistId}&isAvailable=1`)
        .then(response => {
          const specialistAppointments = response.data.filter(appointment => appointment.specialist.id === parseInt(specialistId));
          setAvailableAppointments(specialistAppointments);
          setAppointmentsBySpecialist(prevState => ({
            ...prevState,
            [specialistId]: specialistAppointments
          }));
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
    axios.post('https://localhost:7209/api/appointment/book', {
      appointmentId
    })
      .then(response => {
        alert('Appointment booked successfully!');
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
              <label>Spesialist</label>
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
              <div specialist={selectedSpecialist}>
                <label>{`Velg avtaletidspunkt med ${selectedAppointment ? appointmentsBySpecialist[selectedSpecialist].find(appointment => appointment.id === selectedAppointment).specialist.firstName : ''}`}</label>
                <select value={selectedAppointment} onChange={handleAppointmentChange}>
                  <option value="">Tidspunkt</option>
                  {appointmentsBySpecialist[selectedSpecialist] && appointmentsBySpecialist[selectedSpecialist].map(appointment => (
                    <option key={appointment.id} value={appointment.id}>{appointment.startTime} - {appointment.endTime}</option>
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
