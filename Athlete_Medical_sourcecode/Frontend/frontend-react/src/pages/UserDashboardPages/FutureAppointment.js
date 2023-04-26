import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import HeaderUser from "../../components/UserDashboard/HeaderUser";

const FutureAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // Fetch appointment data from API on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = Cookies.get("userId");

        const response = await axios.get(`https://localhost:7209/api/appointment/byUserId?UserId=${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
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
      alert("avtalen er slettet!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      // Show error message
      alert("avtalen er ikke slettet, prøve igjen!.");
    }
  };

  // Cancel appointment deletion
  const cancelDeleteAppointment = () => {
    // Reset deleteConfirmation state
    setDeleteConfirmation(null);
  };
  return (
    <>
      <HeaderUser />
      <Container style={{ minHeight: 'calc(100vh - 275px)' }}>
        <h2 className="mt-4">Dine Avtaler</h2>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <Row key={appointment.appointmentId} className="mb-3 p-3 align-items-center border">
              <Col className="appointmentDetails">
                <p>Avtale Tid: {appointment.startTime} - {appointment.endTime}</p>
                <p>Rom nummer: {appointment.roomId}</p>
                <p>Spesialistens navn: {appointment.name}</p> 
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="success" onClick={() => handleDeleteAppointment(appointment.appointmentId)}>
                  Slett avtalen
                </Button>
              </Col>
            </Row>
          ))
        ) : (
          <p>Du har ingen avtaler!</p>
        )}
        <Modal show={!!deleteConfirmation} onHide={cancelDeleteAppointment}>
          <Modal.Header closeButton>
            <Modal.Title>Bekreftelse</Modal.Title>
          </Modal.Header>
          <Modal.Body>Er du sikker på at du vil slette avtalen!, trykk på ja for slette!</Modal.Body>
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
    </>
  );
};

export default FutureAppointment;