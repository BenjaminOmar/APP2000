import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";


const MakeSchedule = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get("https://localhost:7209/api/room/getAll")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        setErrorMsg("Error: Could not fetch rooms");
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
        setSuccessMsg("timeplanen er lagret");
        setErrorMsg("");
      })
      .catch((error) => {
        setErrorMsg("Error: kunne ikke lagret timeplanen, husk å legge inn riktig tid");
        setSuccessMsg("");
      });
  };

  return (
    <>
      <HeaderSpec />
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            {successMsg && (
              <Alert variant="success" onClose={() => setSuccessMsg("")} dismissible>
                {successMsg}
              </Alert>
            )}
            {errorMsg && (
              <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
                {errorMsg}
              </Alert>
            )}
            <h1 className="mb-5">Lag timeplan</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Starts:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={startTime}
                  onChange={handleStartTimeChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Sluttes:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={endTime}
                  onChange={handleEndTimeChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Velg rom:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedRoom}
                  onChange={handleRoomSelect}
                  required
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
    </>
  );
};

export default MakeSchedule;
