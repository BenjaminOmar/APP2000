// Importing necessary packages and components
import React, { useEffect, useState } from "react";
import HeaderUser from "../../components/UserDashboard/HeaderUser";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AdminSeeAppointments from "../../components/AdminDashboard/AdminSeeAppointments";

function UserBooking() {
  const [specialist, setSpecialist] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [availableAppointments, setAvailableAppointments] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const username = Cookies.get("username"); // Retrieving username from Cookies using js-cookie

  // Defining options for formatting start and end dates and times
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

  // This useEffect hook will be called once on initial render,
  // and fetches all users with a roleId of 2 from the backend
  useEffect(() => {
    axios
      .get("https://localhost:7209/api/user/getAll")
      .then((response) => {
        // Filters the response data and sets the specialist state with it
        const filteredUsers = response.data.filter(
          (specialist) => specialist.roleId === 2
        );
        setSpecialist(filteredUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // handleShowAvailableAppointments function takes a selectedSpecialist object and makes a GET request 
  // to fetch all available appointments for that specialist
  const handleShowAvailableAppointments = (selectedSpecialist) => {
    axios
      .get(`https://localhost:7209/api/appointment/available`)
      .then((response) => {
        // It filters the response data to only include appointments for the selected specialist, 
        // sorts the filtered data by start time, sets the availableAppointments state with it 
        // and sets the selectedSpecialist state with the selectedSpecialist object that was passed in
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

  // The navigate function is obtained from the useNavigate hook imported from react-router-dom
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/FutureAppointment");
  };


  // handleBookAppointment function takes an appointment object and constructs a data object with
  // the appointmentId and patientId (fetched from cookies), and makes a PUT request to book the appointment
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
        // If the booking is successful, it will display an alert with the appointment start time, specialist name
        // and confirmation message and navigates to 'min side' or 'fremtidige avtaler'
        setShowModal(true);
        setSelectedAppointment(appointment);

        console.log(data);
        console.log(result.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  // This is the JSX code that renders the component.
  // It contains a table of specialist users and a table of available appointments, and allows patients to book appointments.
  return (
    <>
      <HeaderUser /> {/*Renders the 'HeaderAdmin' component */}
      <div className="container my-5" style={{ paddingTop: '50px', minHeight: 'calc(100vh - 480px)', paddingBottom: "150px" }} >
        <h2 className="mb-3" style={{ marginTop: '-50px', paddingBottom: "30px" }}>Timebestilling</h2>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Spesialist</th>
              <th>Epostadresse</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {specialist.map((specialist) => ( // Maps through a list of specialists and renders a table row for each one
              <tr key={specialist.userId}>
                <td>{specialist.firstName} {specialist.middleName} {specialist.lastName}</td> {/* Displays the specialist's name */}
                <td>{specialist.email}</td> {/* Displays the specialist's email address*/}
                <td>
                  <Button
                    variant="primary"
                    // Calls handleShowAvailableAppointments function when the button is clicked
                    onClick={() => handleShowAvailableAppointments(specialist)}
                  >
                    Se ledige avtaler {/*Displays a button to show available appointments for the specialist */}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {availableAppointments !== null && selectedSpecialist !== null && ( // Conditionally renders a section to show available appointments if both availableAppointments and selectedSpecialist are not null
          <>
            <h2 className="mt-5">{`${selectedSpecialist.firstName} ${selectedSpecialist.lastName} sine ledige avtaler`}</h2>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Avtaletidspunkt</th> {/*Displays the appointment date and time*/}
                  <th>Romnummer</th> {/*Displays the room number for the appointment*/}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {availableAppointments.map((appointment) => ( // Maps through a list of available appointments and renders a table row for each one
                  <tr key={appointment.appointmentId}>
                    <td>
                      {new Date(appointment.startTime).toLocaleDateString("nb-NO", startOptions)} {" - "}
                      {/*Displays the appointment start time and end time */}
                      {"kl. " + new Date(appointment.endTime).toLocaleTimeString("nb-NO", endOptions)}
                    </td>
                    <td>{appointment.roomId}</td> {/*Displays the room number for the appointment*/}
                    <td>
                      <Button
                        variant="primary"
                        // Calls handleBookAppointment function when the button is clicked
                        onClick={() => handleBookAppointment(appointment)}
                      >
                        Bestill time {/*Displays a button to book the appointment*/}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {/* Renders a Modal component */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>

                <Modal.Title>Bekreftelse på timebestilling</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Du har time {selectedAppointment && new Date(selectedAppointment.startTime).toLocaleDateString("nb-NO", startOptions)} - {selectedAppointment && new Date(selectedAppointment.endTime).toLocaleTimeString("nb-NO", endOptions)} hos {selectedSpecialist && selectedSpecialist.firstName} {selectedSpecialist && selectedSpecialist.middleName} {selectedSpecialist && selectedSpecialist.lastName}</p>
                <p>{selectedAppointment && "Timebestillingen din er bekreftet. Takk!"}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleCloseModal}>
                  Lukk
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}

// Exports the AdminBooking component as the default export
export default UserBooking;  