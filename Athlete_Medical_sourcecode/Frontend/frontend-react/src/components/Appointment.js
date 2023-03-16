import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import "./Appointment.css";

const Appointment = () => {
  const [employee, setEmployee] = useState('');
  const [date, setDate] = useState(new Date());
  const [timeslots, setTimeslots] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);

  const handleEmployeeChange = (event) => {
    setEmployee(event.target.value);
    setTimeslots([]);
    setSelectedTimeslot(null);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setTimeslots([]);
    setSelectedTimeslot(null);

    axios
    .get(`/api/appointment/available?employee=${employee}&date=${newDate.toISOString().substring(0, 10)}`)
      .then((response) => {
        setTimeslots(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTimeslotClick = (timeslot) => {
    setSelectedTimeslot(timeslot);
  };

  const handleConfirmAppointment = () => {
    axios
    .put(`/api/appointment/book?employee=${employee}&timeslot=${selectedTimeslot}`)
      .then((response) => {
        console.log(response.data);
        setTimeslots([]);
        setSelectedTimeslot(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='appointment'>
      <h1>Timebestilling</h1>
      <label htmlFor="employee-select">Spesialist:</label>
      <select id="employee-select" value={employee} onChange={handleEmployeeChange}>
        <option value="">Velg en spesialist</option>
        <option value="employee1">Geir Arne Nilsen</option>
        <option value="employee2">Karoline Ernstsen</option>
        <option value="employee3">Hedda Vold</option>
      </select>
      {employee && (
        <div>
          <label htmlFor="date-select">Velg dato:</label>
          <Calendar value={date} onChange={handleDateChange} />
          {timeslots.length > 0 && (
            <div>
              <h2>Tilgjengelig tidspunkt:</h2>
              <ul>
                {timeslots.map((timeslot) => (
                  <li key={timeslot}>
                    <button onClick={() => handleTimeslotClick(timeslot)}>{timeslot}</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {selectedTimeslot && (
            <div>
              <h2>Valgt tidspunkt:</h2>
              <p>{selectedTimeslot}</p>
              <button onClick={handleConfirmAppointment}>Bestill time</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appointment;
