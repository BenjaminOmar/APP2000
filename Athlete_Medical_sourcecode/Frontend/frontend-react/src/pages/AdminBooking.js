import React, { useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from 'js-cookie';
import '../components/AdminBooking.css';


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
    { name: "Ortoped: Geir Arne Nilsen", id: 20 },
    { name: "Fysioterapeut: Hedda Vold", id: 21 },
    { name: "Fysikalsk lege: Karoline Ernstsen", id: 22 },
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
      <div className="admin-booking-container">
        <style>
          {`
            .selected-appointment {
              background-color: #ccc;
              cursor: pointer;
            }
  
            .search-button {
              background-color: #1d75bd;
              color: #fff;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
            }
  
            .search-button:hover,
            .appointment:hover,
            .book-appointment:hover {
              background-color: #1a202c;
            }
  
            .book-appointment {
              background-color: #1d75bd;
              color: #fff;
              border: none;
              padding: 0.5rem 1rem;
              border-radius: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
              margin-top: 1rem;
            }
          `}
        </style>
        <div className="w-full text-center">
          <h2 className="text-lg font-medium mb-2">Bestill time</h2>
          <div className="flex items-center mb-4 justify-center">
            <label htmlFor="selectSpecialist" className="mr-2">
              Spesialist
            </label>
            <select
              id="selectSpecialist"
              onChange={(e) => handleSpecialistIdChange(e.target.value)}
              className="border border-gray-400 rounded p-1"
            >
              <option value="">Velg en spesialist</option>
              {specialistOptions.map((specialist) => (
                <option key={specialist.id} value={specialist.id}>
                  {specialist.name}
                </option>
              ))}
            </select>
            <button className="ml-4 search-button" onClick={handleSearch}>
              Søk
            </button>
          </div>
          {specialistId && appointments.length > 0 && (
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-medium mb-2">Ledige avtaler:</h2>
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex-1 lg:mr-8">
                  <Calendar
                    onClickDay={handleCalendarDayClick}
                    value={calendarDate}
                  />
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
                            selectedAppointment === appointment
                              ? "selected-appointment appointment"
                              : "appointment"
                          }
                        >
                          {formatDate(appointment.startTime)} -{" "}
                          {formatDate(appointment.endTime)}
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
                Valgt time:{" "}
                {formatDate(selectedAppointment.startTime)} -{" "}
                {formatDate(selectedAppointment.endTime)}
              </p>
           
              <div className="mt-4">
                <button className="ml-4 book-appointment" onClick={handleBookAppointment}>
                  Bestill time
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
  
        }  
  export default AdminBooking;  