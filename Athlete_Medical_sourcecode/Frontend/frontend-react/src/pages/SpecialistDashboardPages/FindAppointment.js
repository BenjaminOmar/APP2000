import React, { useState, useEffect } from "react";

import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import axios from "axios";

const FindAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const specialistId = 27; // replace with the logged-in specialist id from cookies

      const appointmentsResponse = await axios.get(
        `https://localhost:7209/api/appointment/getAll`
      );

      const patientsResponse = await axios.get(
        `https://localhost:7209/api/user/patients`
      );

      const patientsMap = patientsResponse.data.reduce(
        (map, patient) => ({ ...map, [patient.id]: patient }),
        {}
      );

      const filteredAppointments = appointmentsResponse.data.filter(
        (appointment) =>
          appointment.specialistId === specialistId &&
          patientsMap[appointment.patientId]
      );

      const enrichedAppointments = filteredAppointments.map(
        (appointment) => ({
          ...appointment,
          patient: patientsMap[appointment.patientId].name,
          specialist: "Dr. Specialist", // replace with specialist name if available in API
        })
      );

      setAppointments(enrichedAppointments);
    };

    fetchAppointments();
  }, []);

  return (
    <div>
        <HeaderSpec/>
      <h1>Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Specialist</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Room ID</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.patient}</td>
              <td>{appointment.specialist}</td>
              <td>{appointment.startTime}</td>
              <td>{appointment.endTime}</td>
              <td>{appointment.roomId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindAppointment;
