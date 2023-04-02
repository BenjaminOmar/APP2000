import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import styles from "./MakeSchedule.module.css";

const MakeSchedule = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7209/api/room/getAll")
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleStartTimeChange = event => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = event => {
    setEndTime(event.target.value);
  };

  const handleRoomSelect = event => {
    setSelectedRoom(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const appointmentData = {
      startTime: startTime,
      endTime: endTime,
      roomId: selectedRoom,
      specialistId: Cookies.get("userId")
    };

    axios
      .post("https://localhost:7209/api/appointment/create", appointmentData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <HeaderSpec />
      <div className={styles.container}>
        <h1 className={styles.heading}>Make Schedule</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="start-time-input">Starts:</label>
            <input
              type="datetime-local"
              id="start-time-input"
              value={startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="end-time-input">Sluttes:</label>
            <input
              type="datetime-local"
              id="end-time-input"
              value={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="room-select">Velge room:</label>
            <select
              id="room-select"
              value={selectedRoom}
              onChange={handleRoomSelect}
            >
              {rooms.map(room => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomId}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default MakeSchedule;
