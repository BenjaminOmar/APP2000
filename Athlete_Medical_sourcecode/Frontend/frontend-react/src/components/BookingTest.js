import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function BookingTest() {
	const [patientId, setPatientId] = useState("");
	const [appointmentId, setAppointmentId] = useState("");

	const handleAppointmentIdChange = (value) => {
		setAppointmentId(value);
		console.log(value);
	};

	const handlePatientIdChange = (value) => {
		setPatientId(value);
		console.log(value);
	};

	const handleSave = () => {
		const data = {
			appointmentId: appointmentId,
			patientId: patientId,
		};
		const url = `https://localhost:7209/api/appointment/book?appId=${appointmentId}&patId=${patientId}`;
		axios
			.put(url, data)
			.then((result) => {
				alert(result.data);
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
			<div>
				<label>appointmentId</label>
				<input
					type="text"
					id="txtAppointmentId"
					onChange={(e) => handleAppointmentIdChange(e.target.value)}></input>
			</div>
			<div>
				<label>patientId</label>
				<input
					type="text"
					id="txtPatientId"
					onChange={(e) => handlePatientIdChange(e.target.value)}></input>
			</div>
			<button onClick={() => handleSave()}>Save</button>
		</>
	);
}

export default BookingTest;
