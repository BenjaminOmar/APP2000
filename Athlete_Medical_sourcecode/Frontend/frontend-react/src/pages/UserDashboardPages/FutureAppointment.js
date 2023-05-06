//This code displays a list of future appointments for the user. 
//It fetches appointment data from an API and filters appointments that have not passed yet. 
//The component allows the user to delete appointments, with a confirmation dialog and success/error message modal. 
//It also includes a header component and some Bootstrap styling for layout.


import React, { useState, useEffect } from "react"; //importing required modules
import axios from "axios"; //importing axios for making API calls
import { Container, Row, Col, Button, Modal } from "react-bootstrap"; //importing components from React Bootstrap
import Cookies from "js-cookie"; //importing js-cookie for working with cookies
import HeaderUser from "../../components/UserDashboard/HeaderUser"; //importing custom component

//defining a functional component
const FutureAppointment = () => {
  //using useState hook to create a state variable "appointments" 
  //and its setter function "setAppointments" with initial value as an empty array
  const [appointments, setAppointments] = useState([]);
  //using useState hook to create a state variable "deleteConfirmation" and its setter 
  //function "setDeleteConfirmation" with initial value as null
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  //using useState hook to create a state variable "infoMessage" 
  //and its setter function "setInfoMessage" with initial value as an empty string
  const [infoMessage, setInfoMessage] = useState('');
  //using useState hook to create a state variable "showInfoModal" and its 
  //setter function "setShowInfoModal" with initial value as false
  const [showInfoModal, setShowInfoModal] = useState(false);
  //creating a new Date object to get the current date and time
  const currentDateTime = new Date();
  //creating a new array "filteredAppointments" by filtering out the appointments that have passed
  const filteredAppointments = appointments.filter(appointment => {
    //creating a new Date object from the appointment start time
    const appointmentDateTime = new Date(appointment.startTime);
    //returning true if the appointment start time is on or after the current date and time
    return appointmentDateTime >= currentDateTime;  //keep appointments that have not passed yet
  })

  // Fetch appointment data from API on component mount
  useEffect(() => {
    // Define an asynchronous function to fetch appointments
    const fetchAppointments = async () => {
      try {
        // Get the user ID from cookie
        const userId = Cookies.get("userId");
        // Make an HTTP GET request to the API to get appointments for the user
        const response = await axios.get(`https://localhost:7209/api/appointment/byUserId?UserId=${userId}`);
        // Set the appointment data in state using the response data from the API
        setAppointments(response.data);
        ///Alert the user with error message in modal if the fetch appointments fails. 
      } catch (error) {
        setInfoMessage("Noe gikk galt", error);
        setShowInfoModal(true);
      }
    };
     // Call the fetchAppointments function when the component mounts
    fetchAppointments();
  }, []);

  // Handle appointment deletion
  const handleDeleteAppointment = async (appointmentId) => {
    // Set the appointmentId in state to show confirmation dialog
    setDeleteConfirmation(appointmentId);
  };

  // Confirm appointment deletion
  const confirmDeleteAppointment = async (appointmentId) => {
    try {
      // Make API request to delete appointment
      await axios.delete(`https://localhost:7209/api/appointment/delete?AppointmentId=${appointmentId}`);
      // Update appointments state to reflect deletion
      setAppointments(appointments.filter((appointment) => appointment.appointmentId !== appointmentId));
      // Reset deleteConfirmation state
      setDeleteConfirmation(null);
      // Show success message
      setInfoMessage("Avtalen er slettet!");
      setShowInfoModal(true);

    } catch (error) {
       // Show error message if delete fails
      setInfoMessage("Avtalen ble ikke slettet, prøv igjen!", error);
      setShowInfoModal(true);
    }
  };

  // Cancel appointment deletion
  const cancelDeleteAppointment = () => {
    // Reset deleteConfirmation state
    setDeleteConfirmation(null);
  };
  return (
    <>
    {/* renders the user profile header */}
      <HeaderUser /> 
      {/* Container component that wraps the appointment list */}
      <Container style={{ minHeight: 'calc(100vh - 450px)', marginTop: '50px' }}>
        {/* Heading for the appointment list */}
        <h2 className="mt-4">Dine Avtaler</h2>
        {/* If there are appointments in the filteredAppointments array
         loop through each appointment and create a new list item */}
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (  
            //Row and column component that contains appointment details          
            <Row key={appointment.appointmentId} className="mb-3 p-3 align-items-center border">
              <Col className="appointmentDetails">
                {/* Displays start and end time of the appointment */}
                <p>Avtale Tid: {appointment.startTime} - {appointment.endTime}</p>
                {/* displays the room number where the appointment takes place */}
                <p>Rom nummer: {appointment.roomId}</p>
                {/* displays the name of the specialist */}
                <p>Spesialistens navn: {appointment.name}</p>
              </Col>
              {/* delete button for the appointment */}
              <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={() => handleDeleteAppointment(appointment.appointmentId)}>
                  Slett avtalen
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          // If there are no appointments, display this message
          <p>Du har ingen avtaler!</p>
        )}
         {/* This is a modal that pops up when the user wants to delete an appointment */}
        <Modal show={!!deleteConfirmation} onHide={cancelDeleteAppointment}>
          <Modal.Header closeButton>
            <Modal.Title>Bekreftelse</Modal.Title>
          </Modal.Header>
          <Modal.Body>Er du sikker på at du vil slette avtalen?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDeleteAppointment}>
              Nei
            </Button>
            <Button variant="danger" onClick={() => confirmDeleteAppointment(deleteConfirmation)}>
              Ja
            </Button>
          </Modal.Footer>
        </Modal>
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
    </>


  );
};

export default FutureAppointment;