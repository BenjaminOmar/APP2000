// This code implements a React component called `MakeSchedule`. It handles the 
// creation of schedules by allowing the user to select a start and end time, 
// as well as an available room. The code fetches data from an API to check for 
// existing appointments and available rooms. It performs validations to avoid 
// time conflicts and incorrect input values. When the user submits the form, 
// the schedule is created by making an HTTP POST request to the API. 
// Any error messages are displayed in a modal to inform the user.


// Importing React, useState, and useEffect from the 'react' package
import React, { useState, useEffect } from "react";
// Importing 'axios' package for making HTTP requests
import axios from "axios";
// Importing 'js-cookie' package for handling cookies
import Cookies from "js-cookie";
// Importing some UI components from the 'react-bootstrap' package
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";

// Importing the 'HeaderSpec' component from a local file
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";

// Defining a functional component called 'MakeSchedule'
const MakeSchedule = () => {
  // Declaring a state variable 'startTime' with an initial value of an empty string, 
  // and a function 'setStartTime' to update its value
  const [startTime, setStartTime] = useState("");
  // Declaring a state variable 'endTime' with an initial value of an empty string, 
  //and a function 'setEndTime' to update its value
  const [endTime, setEndTime] = useState("");
  // Declaring a state variable 'selectedRoom' with an initial value of an empty string, 
  // and a function 'setSelectedRoom' to update its value
  const [selectedRoom, setSelectedRoom] = useState("");
  // Declaring a state variable 'rooms' with an initial value of an empty array, 
  // and a function 'setRooms' to update its value
  const [rooms, setRooms] = useState([]);
  // Declaring a state variable 'infoMessage' with an initial value of an empty string, 
  // and a function 'setInfoMessage' to update its value
  const [infoMessage, setInfoMessage] = useState('');
  // Declaring a state variable 'infoMessage' with an initial value of an empty string, 
  //and a function 'setInfoMessage' to update its value
  const [showInfoModal, setShowInfoModal] = useState(false);
  // Declaring a state variable 'appointments' with an initial value of an empty array, 
  // and a function 'setAppointments' to update its value  
  const [appointments, setAppointments] = useState([]);

// Function to fetch data from the API
  const fetchData = async () => {
    try {
       // Make multiple HTTP requests simultaneously using 'axios.all'
      const [appointmentsResponse, roomsResponse] = await axios.all([
        // The first request gets all appointments from the API
        axios.get("https://localhost:7209/api/appointment/getAll2"),
        // The second request gets all rooms from the API
        axios.get("https://localhost:7209/api/room/getAll")
      ]);
      // After both requests have been completed, update the state variables
      setAppointments(appointmentsResponse.data);
      setRooms(roomsResponse.data);
    } catch (error) {
      // Handle error if any request fails
      setInfoMessage("Feil ved henting av data fra databasen", error);
      setShowInfoModal(true);
    }
  }

   // The 'useEffect' hook is called after the component has been mounted
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

  // This function updates the 'startTime' state variable when the user changes the start time
  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };
  // This function updates the 'endTime' state variable when the user changes the end time
  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };
  // This function updates the 'selectedRoom' state variable when the user selects a room
  const handleRoomSelect = (event) => {
    setSelectedRoom(event.target.value);
  };

  // Define a function to handle form submission
  const handleSubmit = (event) => {


    // Prevent the default form submission behavior
    event.preventDefault();
    // Clear any previous info messages
    setInfoMessage('');
    // Get the current date and time
    const now = new Date();
    // Create an object with appointment data based on form input
    const appointmentData = {
      startTime: startTime,
      endTime: endTime,
      roomId: selectedRoom,
      specialistId: Cookies.get("userId"), // Use the specialist ID stored in a cookie
    };
    // Loop through existing appointments to check for conflicts
    for (let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];
      const appointmentStartTime = new Date(appointment.startTime);
      const appointmentEndTime = new Date(appointment.endTime);
      const appointmentDataStartTime = new Date(appointmentData.startTime);
      const appointmentDataEndTime = new Date(appointmentData.endTime);
      const appointmentRoomID = parseInt(appointment.roomId);
      const appointmentDataRoomID = parseInt(appointmentData.roomId);
      // Check if the selected room is already booked for the selected time
      console.log(appointments);
      if (
        appointmentDataRoomID == appointmentRoomID &&
        ((appointmentDataStartTime.valueOf() >= appointmentStartTime.valueOf() &&
          appointmentDataStartTime.valueOf() <= appointmentEndTime.valueOf()) ||
          (appointmentDataEndTime.valueOf() >= appointmentStartTime.valueOf() &&
            appointmentDataEndTime.valueOf() <= appointmentEndTime.valueOf()))
      ) {
        // Set the info message
        setInfoMessage("Rom nr. " + selectedRoom + ", er opptatt i tidspunktet du har valgt");
        // Show the info modal
        setShowInfoModal(true);
        // Exit the function to prevent appointment creation
        return;
      }
      // Check if the specialist is already booked for the selected time
      if (
        appointment.specialistId == appointmentData.specialistId &&
        ((appointmentDataStartTime.valueOf() >= appointmentStartTime.valueOf() &&
          appointmentDataStartTime.valueOf() <= appointmentEndTime.valueOf()) ||
          (appointmentDataEndTime.valueOf() >= appointmentStartTime.valueOf() &&
            appointmentDataEndTime.valueOf() <= appointmentEndTime.valueOf()))
      ) {
        setInfoMessage("Du er opptatt i tidspunktet du har valgt");
        setShowInfoModal(true);
        return;
      }
    }
    // Check that the start time is before the end time
    if (appointmentData.startTime >= appointmentData.endTime) {
      setInfoMessage("Starttidspunktet må være etter slutttidspunktet");
      setShowInfoModal(true);
      return;
    }
    // Check that the start time is not in the past
    if (new Date(appointmentData.startTime) < now) {
      setInfoMessage("Du kan ikke opprette som ligger tilbake i tid");
      setShowInfoModal(true);
      return;
    }
    // If all checks pass, make a POST request to create the appointment
    axios
      .post("https://localhost:7209/api/appointment/create", appointmentData)
      .then((response) => {
        setInfoMessage("timeplanen er lagret", response);
        setShowInfoModal(true);
        // Clear the form input fields
        setStartTime('');
        setEndTime('');
        setSelectedRoom('');
        // Call the fetchData function
        fetchData();
        return;
      })
      .catch((error) => {
        setInfoMessage("Error: kunne ikke lagre timeplanen.", error); // Set the error message
        setShowInfoModal(true); // Show the info modal
        return;
      });
  };


  // Render the component.
  return (
    <div >
      {/* This imports and adds a header component at the top of the page */}
      <HeaderSpec />
      {/* A container component with specified style properties */}
      <Container style={{ paddingTop: '10px', paddingBottom: "80px", minHeight: 'calc(100vh - 390px)' }}>
        {/* A row component with specified classes and styles */}
        <Row className="justify-content-center mt-5">
          {/* A column component with medium size of 6 and specified style properties */}
          <Col md={6}>
            {/* A heading element with specified text and styles */}
            <h1 className="mb-5">Lag timeplan</h1>{/* This renders the title. */}
            {/* A form component with an onSubmit function specified */}
            <Form onSubmit={handleSubmit}>
              {/* A form group component */}
              <Form.Group>
                {/* A label element with specified text */}
                <Form.Label>Start tid:</Form.Label>
                {/* A form control component with specified type, name, value, onChange and style properties */}
                <Form.Control
                  type="datetime-local"
                  name="startTime"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  required
                  style={{ marginBottom: '20px' }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Slutt tid:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="endTime"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  required
                  style={{ marginBottom: '20px' }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Velg rom:</Form.Label>
                <Form.Control
                  as="select"
                  name="selectedRoom"
                  value={selectedRoom}
                  onChange={handleRoomSelect}
                  required
                  style={{ marginBottom: '20px' }}
                >
                  {/* An option element with specified value and text */}
                  <option value="">Velg rom</option>
                  {/* Maps through the "rooms" array and creates option elements for each room */}
                  {rooms.map((room) => (
                    <option key={room.roomId} value={room.roomId}>
                      {room.roomId}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              {/* A button component with specified type, variant, class and text properties */}
              <Button
                variant="primary"
                type="submit"
                className="mt-3"
              >
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/* This creates a new modal that is displayed when the "showInfoModal" state is set to "true". */}
      <Modal
        show={showInfoModal}
        onHide={() => setShowInfoModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton> {/* This creates a header within the modal dialog with a close button. */}
          <Modal.Title></Modal.Title> {/* This sets the title of the modal dialog. */}
        </Modal.Header>
        <Modal.Body>{infoMessage}</Modal.Body> {/* This displays the error message within the modal dialog. */}
        <Modal.Footer>
          <Button style={{ width: '60%', marginRight: '21%' }} variant="primary" onClick={() => setShowInfoModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
//The component is exported as a default export
export default MakeSchedule;
