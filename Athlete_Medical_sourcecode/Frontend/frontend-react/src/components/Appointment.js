import React, { useState } from "react";
import axios from "axios";

function Appointment() {
  const [specialistId, setSpecialistId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSpecialistIdChange = (value) => {
    setSpecialistId(value);
    console.log(value);
  };

  const handleSearch = () => {
    const url = `https://localhost:7209/api/appointment/available/specId?specId=${specialistId}&isAvailable=1`;
    axios
      .get(url)
      .then((result) => {
        setAppointments(result.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleBookAppointment = () => {
    // code to book the selected appointment
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('nb-NO', options);
  }
  

  return (
    <>
      <style>
        {`
          .selected-appointment {
            background-color: #ccc;
            cursor: pointer;
          }
        `}
      </style>
      <div>
        <label>SpecialistId</label>
        <input
          type="text"
          id="txtSpecialistId"
          onChange={(e) => handleSpecialistIdChange(e.target.value)}
        ></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Available Appointments:</h2>
        <ul>
          {appointments.map((appointment) => (
            <li
              key={appointment.appointmentId}
              onClick={() => handleAppointmentClick(appointment)}
              className={selectedAppointment === appointment ? "selected-appointment" : ""}
            >
              {formatDate(appointment.startTime)} - {formatDate(appointment.endTime)}
            </li>
          ))}
        </ul>
      </div>
      {selectedAppointment && (
        <div>
          <p>Selected Appointment: {formatDate(selectedAppointment.startTime)} - {formatDate(selectedAppointment.endTime)}</p>
          <button onClick={handleBookAppointment}>Book selected appointment</button>
        </div>
      )}
    </>
  );
}


export default Appointment;
