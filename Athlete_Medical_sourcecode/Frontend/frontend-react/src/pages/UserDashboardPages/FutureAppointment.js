import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./FutureAppointment.module.css";
import Cookies from "js-cookie";
import HeaderUser from "../../components/UserDashboard/HeaderUser";

const FutureAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  
    // Fetch appointment data from API on component mount
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          //const userId = Cookies.get("UserID");
          const userId=20;
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
        setAppointments(appointments.filter(appointment => appointment.appointmentId !== appointmentId));
        // Reset deleteConfirmation state
        setDeleteConfirmation(null);
        // Show success message
        alert("Appointment deleted successfully!");
      } catch (error) {
        console.error("Error deleting appointment:", error);
        // Show error message
        alert("Failed to delete appointment. Please try again later.");
      }
    };
  
    // Cancel appointment deletion
    const cancelDeleteAppointment = () => {
      // Reset deleteConfirmation state
      setDeleteConfirmation(null);
    };
return (
    <>
    <HeaderUser/>
    <div className={styles.container}>
      <h2 className={styles.title}>Dine Avtaler</h2>
      {appointments.length > 0 ? (
        appointments.map(appointment => (
          <div key={appointment.appointmentId} className={styles.appointmentContainer}>
            <div className={styles.appointmentDetails}>
              <p>Avtaled Tid: {appointment.startTime} - {appointment.endTime}</p>
              <p>Rom nummer: {appointment.roomId}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteAppointment(appointment.appointmentId)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No appointments found.</p>
      )}
      {deleteConfirmation && (
        <div className={styles.confirmationDialog}>
          <p>Are you sure you want to delete this appointment?</p>
          <div>
            <button className={styles.confirmButton} onClick={() => confirmDeleteAppointment(deleteConfirmation)}>Yes</button>
            <button className={styles.cancelButton} onClick={cancelDeleteAppointment}>No</button>
          </div>
        </div>
      )}
    </div>
    </>
    
  );
}

export default FutureAppointment;
