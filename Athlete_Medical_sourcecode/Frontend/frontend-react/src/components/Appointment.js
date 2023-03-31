import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Appointment() {
  const [specialistId, setSpecialistId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());

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
    const data = {
      appointmentId: selectedAppointment.appointmentId,
      patientId: patientId,
    };
    const url = `https://localhost:7209/api/appointment/book?appId=${selectedAppointment.appointmentId}&patId=${patientId}`;
    axios
      .put(url, data)
      .then((result) => {
        alert(result.data);
        console.log(data);
        console.log(result.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const handlePatientIdChange = (value) => {
    setPatientId(value);
    console.log(value);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", options);
  };

  const handleCalendarDayClick = (value) => {
    setCalendarDate(value);
    console.log(value);
  };

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
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1", marginRight: "20px" }}>
            <Calendar onClickDay={handleCalendarDayClick} value={calendarDate} />
          </div>
          <div style={{ flex: "1" }}>
            <ul>
              {appointments
                .filter(
                  (appointment) =>
                    new Date(appointment.startTime).toDateString() === calendarDate.toDateString()
                )
                .map((appointment) => (
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
        </div>
      </div>
      {selectedAppointment && (
        <div>
          <p>
            Selected Appointment: {formatDate(selectedAppointment.startTime)} -{" "}
            {formatDate(selectedAppointment.endTime)}
          </p>
          <div>
            <label>Patient Id</label>
            <input
              type="text"
              id="txtPatientId"
              onChange={(e) => setPatientId(e.target.value)}
            ></input>
            <button onClick={handleBookAppointment}>Book selected appointment</button>
          </div>
        </div>
      )}
    </>
  );
  
      }
      
export default Appointment;