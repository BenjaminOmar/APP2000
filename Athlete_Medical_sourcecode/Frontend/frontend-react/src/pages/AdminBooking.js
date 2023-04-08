import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminSeeAppointments from "../components/AdminSeeAppointments";

function AdminBooking() {
  const [specialist, setSpecialist] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const username = Cookies.get("username");

  const startOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  
  const endOptions = {
    hour: "numeric",
    minute: "numeric",
  };
  
  useEffect(() => {
    axios
      .get("https://localhost:7209/api/user/getAll")
      .then((response) => {
        const filteredUsers = response.data.filter(
          (specialist) => specialist.roleId === 2
        );
        setSpecialist(filteredUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowAvailableAppointments = (selectedSpecialist) => {
    axios
      .get(`https://localhost:7209/api/appointment/available`)
      .then((response) => {
        const filteredAppointments = response.data.filter(
          (appointment) => appointment.specialistId === selectedSpecialist.userId
        );
        const sortedAppointments = filteredAppointments.sort((a, b) => {
          return new Date(a.startTime) - new Date(b.startTime);
        });
        setAvailableAppointments(sortedAppointments);
        setSelectedSpecialist(selectedSpecialist);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigate = useNavigate();

  const handleBookAppointment = (appointment) => {
    const data = {
      appointmentId: appointment.appointmentId,
      patientId: Cookies.get("userId"), // Fetches userId from cookies
    };
    const url = `https://localhost:7209/api/appointment/book?appId=${appointment.appointmentId}&patId=${Cookies.get(
      "userId"
    )}`;
    axios
    .put(url, data)
    .then((result) => {
      alert(`Bekreftelse på timebestilling \n\nDu har time ${new Date(appointment.startTime).toLocaleDateString("nb-NO", startOptions)} - ${new Date(appointment.startTime).toLocaleTimeString("nb-NO", endOptions)} hos ${selectedSpecialist.firstName} ${selectedSpecialist.middleName} ${selectedSpecialist.lastName}`);
      navigate("/adminseejournal") // Need to be updated to 'mypage'
      console.log(data);
      console.log(result.data);
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
};
  
return (
  <>
    <HeaderAdmin />
    <div style={{ paddingTop: '30px', paddingBottom: '10px' }}>
        <h2>Velkommen {username} </h2>
      </div>
    <div className="container my-5">
      <p>Her må vi kanskje skrive litt om timestilling....</p>
      <h2 className="mb-3">Timebestilling</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Spesialist</th>
            <th>Epostadresse</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {specialist.map((specialist) => (
            <tr key={specialist.userId}>
              <td>{specialist.firstName} {specialist.middleName} {specialist.lastName}</td>
              <td>{specialist.email}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowAvailableAppointments(specialist)}
                >
                  Se ledige avtaler
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {availableAppointments !== null && selectedSpecialist !== null && (
        <>
          <h2 className="mt-5">{`${selectedSpecialist.firstName} ${selectedSpecialist.lastName} sine ledige avtaler`}</h2>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Avtaletidspunkt</th>         
                <th>Romnummer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {availableAppointments.map((appointment) => (
                <tr key={appointment.appointmentId}>    
                  <td>
                    {new Date(appointment.startTime).toLocaleDateString("nb-NO", startOptions)} {" - "}
                    {"kl. " + new Date(appointment.endTime).toLocaleTimeString("nb-NO", endOptions)}
                  </td>
                  <td>{appointment.roomId}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleBookAppointment(appointment)}
                    >
                      Bestill time
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
    <div>
      <AdminSeeAppointments/>
    </div>
  </>
);

  }
  export default AdminBooking;  