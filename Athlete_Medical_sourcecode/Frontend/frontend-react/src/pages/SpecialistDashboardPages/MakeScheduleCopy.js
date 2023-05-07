import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col, Form, Button, Alert, Modal } from "react-bootstrap";

import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";


const MakeSchedule = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [infoMessage, setInfoMessage] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);


  useEffect(() => {
    axios
      .get("https://localhost:7209/api/room/getAll")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        setInfoMessage("Rommet er ikke ledig, velg et annet", error); // Set the error message
        setShowInfoModal(true); // Show the info modal
        return;
      })
      .catch((error) => {
        setInfoMessage("Rommet er ikke ledig, velg et annet", error); // Set the error message
        setShowInfoModal(true); // Show the info modal
        return;
      });

  }, []);

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleRoomSelect = (event) => {
    setSelectedRoom(event.target.value);
  };

  const checkIfAppointmentExists = (appointments, specialistId, startTime, endTime) => {
    return appointments.some(
      (appointment) =>
        appointment.specialistId === specialistId &&
        ((appointment.startTime >= startTime && appointment.startTime < endTime) ||
          (appointment.endTime > startTime && appointment.endTime <= endTime) ||
          (appointment.startTime <= startTime && appointment.endTime >= endTime))
    );
  };

  const checkIfRoomIsBooked = (appointments, roomId, startTime, endTime) => {
    return appointments.some(
      (appointment) =>
        appointment.roomId === roomId &&
        ((appointment.startTime >= startTime && appointment.startTime < endTime) ||
          (appointment.endTime > startTime && appointment.endTime <= endTime) ||
          (appointment.startTime <= startTime && appointment.endTime >= endTime))
    );
  };


  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const appointmentData = {
      startTime: startTime,
      endTime: endTime,
      roomId: selectedRoom,
      specialistId: Cookies.get("userId"),
    };

    axios
      .post("https://localhost:7209/api/appointment/create", appointmentData)
      .then((response) => {
        setInfoMessage("timeplanen er lagret"); // Set the error message
        setShowInfoModal(true); // Show the info modal
        return;
      })
      .catch((error) => {
        setInfoMessage("Error: kunne ikke lagre timeplanen.", error ); // Set the error message
        setShowInfoModal(true); // Show the info modal
        return;
      });
  };

  return (
    <>
      <HeaderSpec />
      <Container style={{ paddingTop: '50px', minHeight: 'calc(100vh - 390px)' }}>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 className="mb-5">Lag timeplan</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Start tid:</Form.Label>
                <Form.Control
                  type="datetime-local"
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
                  value={selectedRoom}
                  onChange={handleRoomSelect}
                  required
                  style={{ marginBottom: '20px' }}
                >
                  <option value="">Velg rom</option>
                  {rooms.map((room) => (
                    <option key={room.roomId} value={room.roomId}>
                      {room.roomId}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
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
    </>
  );
};

export default MakeSchedule;
