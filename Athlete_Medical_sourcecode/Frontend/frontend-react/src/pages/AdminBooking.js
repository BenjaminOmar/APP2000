import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from 'js-cookie';
function AdminBooking() {
  const [specialistId, setSpecialistId] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSpecialistIdChange = (value) => {
    setSpecialistId(value);
    console.log(value);
  };

  const specialistOptions = [
    { name: "Geir Arne Nilsen", id: 20 },
    { name: "Hedda Vold", id: 21 },
    { name: "Karoline Ernstsen", id: 22 },
  ];

  const handleSearch = () => {
    const url = `https://localhost:7209/api/appointment/available/specId?specId=${specialistId}&isAvailable=1`;
    axios
      .get(url)
      .then((result) => {
        setAppointments(result.data);
        setShowCalendar(true);
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
      patientId: Cookies.get('userId'), // Fetch userId from cookies
    };
    const url = `https://localhost:7209/api/appointment/book?appId=${selectedAppointment.appointmentId}&patId=${Cookies.get('userId')}`;
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
    <HeaderAdmin />
    <div className="container mx-auto my-10">
    
      <style>
        {`
          .selected-appointment {
            background-color: #ccc;
            cursor: pointer;
          }
        `}
      </style>
      <div className="flex flex-col items-center text-center">
  <div> 
  <h2 className="text-lg font-medium mb-2">Bestill time</h2>
    <label>Specialist</label>
    <select
      id="selectSpecialist"
      onChange={(e) => handleSpecialistIdChange(e.target.value)}
    >
      <option value="">Velg en spesialist</option>
      {specialistOptions.map((specialist) => (
        <option key={specialist.id} value={specialist.id}>
          {specialist.name}
        </option>
      ))}
    </select>
    <button className="ml-4" onClick={handleSearch}>
      Søk
    </button>
  </div>
  {specialistId && appointments.length > 0 && (
    <div>
      <h2 className="text-lg font-medium mb-2">Ledige avtaler:</h2>
      <div className="flex">
        <div className="flex-1 mr-8">
          <Calendar onClickDay={handleCalendarDayClick} value={calendarDate} />
        </div>
        <div className="flex-1">
          <ul>
            {appointments
              .filter(
                (appointment) =>
                  new Date(appointment.startTime).toDateString() ===
                  calendarDate.toDateString()
              )
              .map((appointment) => (
                <li
                  key={appointment.appointmentId}
                  onClick={() => handleAppointmentClick(appointment)}
                  className={
                    selectedAppointment === appointment ? "selected-appointment" : ""
                  }
                >
                  {formatDate(appointment.startTime)} - {formatDate(appointment.endTime)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )}
  {selectedAppointment && (
    <div>
      <p className="text-lg font-medium">
        Selected Appointment: {formatDate(selectedAppointment.startTime)} -{" "}
        {formatDate(selectedAppointment.endTime)}
      </p>
      <div className="mt-4">
        <label>Patient Id</label>
        <input
          type="text"
          id="txtPatientId"
          onChange={(e) => setPatientId(e.target.value)}
        ></input>
        <button className="ml-4" onClick={handleBookAppointment}>
          Book selected appointment
        </button>
      </div>
    </div>
  )}
</div>
<div/>
    </div>
    </>
  );
        }  
  export default AdminBooking;  