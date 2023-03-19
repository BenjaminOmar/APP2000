import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./Appointment.css";


function Appointment() {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [isAvailable, setIsAvailable] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

  useEffect(() => {
    axios.get("https://localhost:7209/api/User/specialists").then((response) => {
      setSpecialists(response.data);
    });
  }, []);

  const handleSpecialistChange = (event) => {
    setSelectedSpecialist(event.target.value);
    setSelectedStartTime("");
    setIsAvailable([]);
    setSelectedAppointment("");
    setIsAppointmentBooked(false);
  };

  const handleStartTimeChange = (startTime) => {
    console.log("Selected date:", startTime);
    setSelectedStartTime(startTime);
    setSelectedAppointment("");
    setIsAppointmentBooked(false);
  
    if (selectedSpecialist && startTime >= new Date()) {
      axios
        .get("https://localhost:7209/api/appointment/available", {
          params: {
            specialistId: selectedSpecialist,
            startTime: startTime.toISOString().slice(0, 10),
          },
        })
        .then((response) => {
          const filteredAppointments = response.data.filter(
            (appointment) =>
              appointment.specialistId === selectedSpecialist &&
              new Date(appointment.startTime) >= selectedStartTime &&
              appointment.isAvailable
          );
          setIsAvailable(filteredAppointments);
        });
    } else {
      setIsAvailable([]);
    }
  };
  
  

  const handleAppointmentChange = (event) => {
    setSelectedAppointment(event.target.value);
    setIsAppointmentBooked(false);
  };

  const handleAppointmentBooking = () => {
    axios
      .post("/api/appointment/book", {
        specialistId: selectedSpecialist,
        startTime: selectedStartTime.toISOString(),
        endTime: selectedAppointment,

      })
      .then(() => {
        setIsAppointmentBooked(true);
      });
  }

      return (
        <div className="appointment-container">
          <div className="appointment-system">
            <div>
              <h2>Timebestilling</h2>
              <div>
                <label htmlFor="specialist-select">Spesialist:</label>
                <select
                  id="specialist-select"
                  value={selectedSpecialist}
                  onChange={handleSpecialistChange}
                >
                  <option value="">Velg en spesialist</option>
                  {specialists.map((specialist) => (
                    <option key={specialist.id} value={specialist.id}>
                      {`${specialist.firstName} ${specialist.middleName} ${specialist.lastName}`}
                    </option>
                  ))}
                </select>
              </div>
              {selectedSpecialist && (
                <div>
                  <label htmlFor="date-select">Dato:</label>
                  <Calendar onChange={(date) => handleStartTimeChange(date)} value={selectedStartTime} />
                </div>
              )}
              {selectedStartTime && (
                <div>
                  <label htmlFor="appointment-select">
                    Velg tidspunkt for time:
                  </label>
                  <select
                    id="appointment-select"
                    value={selectedAppointment}
                    onChange={handleAppointmentChange}
                  >
                    <option value="">Velg tidspunkt</option>
                    {isAvailable.map((appointment) => (
                      <option key={appointment.startTime} value={appointment.startTime}>
                          {`${appointment.startTime}-${appointment.endTime}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {selectedAppointment && (
                <div>
                  <button onClick={handleAppointmentBooking}>
                    Bekreft timebestilling
                  </button>
                </div>
              )}
              {isAppointmentBooked && (
                <div>Timen er booket!</div>
              )}
            </div>
          </div>
        </div>
      );
  }
export default Appointment;
