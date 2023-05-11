import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import { Table, Container, Row, Col, Button, Modal } from "react-bootstrap";

const FindAppointment = () => {
	const [bookedAppointments, setBookedAppointments] = useState([]);
	const [availableAppointments, setAvailableAppointments] = useState([]);
	//using useState hook to create a state variable "deleteConfirmation" and its setter
	//function "setDeleteConfirmation" with initial value as null
	const [deleteConfirmation, setDeleteConfirmation] = useState(null);
	//using useState hook to create a state variable "showInfoModal" and its
	//setter function "setShowInfoModal" with initial value as false
	const [showInfoModal, setShowInfoModal] = useState(false);
	//using useState hook to create a state variable "infoMessage"
	//and its setter function "setInfoMessage" with initial value as an empty string
	const [infoMessage, setInfoMessage] = useState("");
	//using useState hook to create a state variable "appointments"
	//and its setter function "setAppointments" with initial value as an empty array
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		const specID = parseInt(Cookies.get("userId"), 10);

		// Fetch booked appointments
		fetchDataBooked(specID);
		// Fetch available appointments
		fetchDataAvailable(specID);
	}, []);

	// Function to fetch data from the API
	const fetchDataAvailable = async (specId) => {
		axios
			.get(
				`https://localhost:7209/api/appointment/available/specId?specId=${specId}`
			)
			//axios.get('https://localhost:7209/api/appointment/available/specId?specId=11')
			.then((response) => {
				console.log(response);
				const available = response.data.filter(
					(appointment) => appointment.isAvailable === 1
				);
				setAvailableAppointments(available);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const fetchDataBooked = async (specId) => {
		axios
			.get("https://localhost:7209/api/appointment/getAll")
			.then((response) => {
				console.log(response);
				const allAppointments = response.data;
				const specialistAppointments = allAppointments.filter(
					(appointment) => appointment.specialistId === specId
				);
				const booked = specialistAppointments.filter(
					(appointment) => appointment.name !== null
				);
				setBookedAppointments(booked);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Confirm appointment deletion
	const confirmDeleteAppointment = async (appointmentId) => {
		try {
			// Make API request to delete appointment
			await axios.delete(
				`https://localhost:7209/api/appointment/delete?AppointmentId=${appointmentId}`
			);
			// Update appointments state to reflect deletion
			setAppointments(
				appointments.filter(
					(appointment) => appointment.appointmentId !== appointmentId
				)
			);
			const specID = parseInt(Cookies.get("userId"), 10);
			// Reset deleteConfirmation state
			setDeleteConfirmation(null);
			// Show success message
			setInfoMessage("Avtalen er slettet!"); // kalle metoden her
			setShowInfoModal(true);
			// Fetch booked appointments
			fetchDataBooked(specID);
			// Fetch available appointments
			fetchDataAvailable(specID);
		} catch (error) {
			// Show error message if delete fails
			setInfoMessage("Avtalen ble ikke slettet, prøv igjen!", error);
			setShowInfoModal(true);
		}
	};

	// Handle appointment deletion
	const handleDeleteAppointment = async (appointmentId) => {
		// Set the appointmentId in state to show confirmation dialog
		setDeleteConfirmation(appointmentId);
	};

	// Cancel appointment deletion
	const cancelDeleteAppointment = () => {
		// Reset deleteConfirmation state
		setDeleteConfirmation(null);
	};
	return (
		<>
			<HeaderSpec />
			<div style={{ minHeight: "50vh" }}>
				<h1
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					Oversikt over avtaler
				</h1>
				<Table
					className="mx-auto"
					//Style the table with striped rows, bordered cells and hover effects
					striped
					bordered
					hover
					// Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
					style={{ width: "70%", marginBottom: "70px" }}>
					<thead>
						<tr>
							<th>Starts</th>
							<th>Sluttes</th>
							<th>Rom nummer</th>
							<th>Navn på pasient</th>
							<th>Administrer</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={4}>
								<b>Fremtide avtaler</b>
							</td>
						</tr>
						{bookedAppointments.map((appointment) => (
							<tr key={appointment.appointmentId}>
								<td>{appointment.startTime}</td>
								<td>{appointment.endTime}</td>
								<td>{appointment.roomId}</td>
								<td>{appointment.name}</td>
								<td>
									<Button
										variant="success"
										onClick={() =>
											handleDeleteAppointment(appointment.appointmentId)
										}>
										Slett avtalen
									</Button>
								</td>
							</tr>
						))}
						<tr>
							<td colSpan={4}>
								<b>Dine ledige timer</b>
							</td>
						</tr>
						{availableAppointments.map((appointment) => (
							<tr key={appointment.appointmentId}>
								<td>{appointment.startTime}</td>
								<td>{appointment.endTime}</td>
								<td>{appointment.roomId}</td>
								<td>{appointment.name}</td>
								<td>
									<Button
										variant="success"
										onClick={() =>
											handleDeleteAppointment(appointment.appointmentId)
										}>
										Slett avtalen
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<Modal show={!!deleteConfirmation} onHide={cancelDeleteAppointment}>
				<Modal.Header closeButton>
					<Modal.Title>Bekreftelse</Modal.Title>
				</Modal.Header>
				<Modal.Body>Er du sikker på at du vil slette avtalen?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={cancelDeleteAppointment}>
						Nei
					</Button>
					<Button
						variant="danger"
						onClick={() => confirmDeleteAppointment(deleteConfirmation)}>
						Ja
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal
				show={showInfoModal}
				onHide={() => setShowInfoModal(false)}
				backdrop="static"
				keyboard={false}>
				<Modal.Header closeButton>
					{" "}
					{/* This creates a header within the modal dialog with a close button. */}
					<Modal.Title></Modal.Title>{" "}
					{/* This sets the title of the modal dialog. */}
				</Modal.Header>
				<Modal.Body>{infoMessage}</Modal.Body>{" "}
				{/* This displays the error message within the modal dialog. */}
				<Modal.Footer>
					<Button
						style={{ width: "60%", marginRight: "21%" }}
						variant="primary"
						onClick={() => setShowInfoModal(false)}>
						OK
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default FindAppointment;
