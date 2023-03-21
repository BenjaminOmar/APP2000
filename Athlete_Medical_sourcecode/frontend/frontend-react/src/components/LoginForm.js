//Kommentere koden
//Lage flipp funksjon

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Modal, ModalHeader } from "react-bootstrap";
import Cookies from "js-cookie";
import "./LoginForm.css";

//Define the login component
const LoginForm = () => {
	//Get the navigate object from the react-router-dom package
	const navigate = useNavigate();
	//Define the state variables for the login forms inputs and error message
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [showModal, setShowModal] = useState(false);

	// Set the cookie expiration time to 30 minutes
	const cookieExpiration = 30 * 60; // 30 minutes in seconds
	// Set the inactivity timeout to 30 minutes
	const inactivityTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
	let inactivityTimer;

	// Get the API URL from the environment variables
	const apiUrl = process.env.REACT_APP_API_URL;

	//function that removes cookies after 30 min of inactivity with alert to user.
	function resetInactivityTimer() {
		clearTimeout(inactivityTimer);
		inactivityTimer = setTimeout(() => {
			// Remove cookies
			Cookies.remove("role");
			Cookies.remove("username");

			// Show a message to the user that they have been logged out due to inactivity
			alert("You have been logged out due to inactivity");

			// Navigate the user to the login page
			navigate("/login");
		}, inactivityTimeout);
	}

	// Handle the form submission
	const handleLoginSubmit = (event) => {
		event.preventDefault(); //Prevent the default form submit action

		//Send a POST request to the ASP.NET Core API with the login credentials
		fetch("https://localhost:7209/api/User/authenticate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((response) => {
				if (!response.ok) {
					//If the response is not ok, set the error message to display to the user
					setErrorMessage("Ugyldig brukernavn eller passord!");
					setShowModal(true);
				}
				return response.json();
			})
			.then((data) => {
				//If the response is successful, navigate to the user page
				//Extract the 'role' property from the response data object
				const role = data.roleId;
				//Set cookies with the user's role, username and expiretimer
				Cookies.set("role", role, { expires: cookieExpiration });
				Cookies.set("username", username, { expires: cookieExpiration });

				resetInactivityTimer();

				//Navigate the user to different pages based on their role
				if (role === 1) {
					navigate("/dashboard");
				} else if (role === 2) {
					navigate("/specialistDashboard");
				} else if (role === 3) {
					navigate("/adminbooking");
				}
			})
			.catch((error) => {
				//Handle any errors that occur during the request or response
				setErrorMessage(error.message);
				setShowModal(true);
			});
	};

	//Add a useEffect hook to check for the cookie when the component mounts
	useEffect(() => {
		const role = Cookies.get("role");
		const username = Cookies.get("username");

		//If there is a cookie with the user's role and username, navigate to their dashboard
		if (role && username) {
			if (role === "1") {
				navigate("/dashboard");
			} else if (role === "2") {
				navigate("/specialistDashboard");
			} else if (role === "3") {
				navigate("/adminbooking");
			}
		}
	}, [navigate]);

	// close error message
	const handleClose = () => {
		setErrorMessage("");
	};

	return (
		<div
			className="d-flex justify-content-center align-items-start"
			style={{
				paddingTop: "50px",
				position: "relative",
				marginBottom: "100px",
			}}>
			{/*A Card component from bootstrap-react that is used to display the Login form. And properties to use flipp function*/}
			<Card className="card-container">
				<Card.Header>
					<h3>Logg Inn</h3> {/* A heading for the Login form */}
				</Card.Header>
				<Card.Body>
					{/* A Form component from bootstrap-react that is used to display a form for logging in */}
					<Form onSubmit={handleLoginSubmit}>
						{/* Display the error message, if any */}
						{errorMessage && (
							<Modal
								show={showModal}
								onHide={() => setShowModal(false)}
								size="sm">
								<ModalHeader closeButton onClick={handleClose} />
								<Modal.Body>{errorMessage}</Modal.Body>
							</Modal>
						)}
						{/* A Form.Group component that contains a Label and a Form.Control for the username */}
						<Form.Group controlId="formBasicEmail">
							<Form.Label style={{ paddingTop: "15px" }}>Brukernavn</Form.Label>
							{/* A Form.Control component that allows the user to input their username */}
							<Form.Control
								type="text"
								placeholder="Skriv brukernavn"
								value={username}
								onChange={(event) => setUsername(event.target.value)}
								required
							/>
						</Form.Group>

						{/* A Form.Group component that contains a Label and a Form.Control for the password */}
						<Form.Group controlId="formBasicPassword">
							<Form.Label style={{ paddingTop: "15px" }}>Passord:</Form.Label>
							{/* A Form.Control component that allows the user to input their password */}
							<Form.Control
								type="password"
								placeholder="Passord"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
							/>
						</Form.Group>

						{/* A Button component that submits the form */}
						<Button
							variant="primary"
							type="submit"
							style={{
								paddingLeft: "150px",
								paddingRight: "150px",
								marginTop: "30px",
								marginLeft: "10px",
								backgroundColor: "#0050B1",
							}}>
							Logg Inn
						</Button>
						<Form.Group style={{ marginTop: "30px" }}>
							{/*Link components that takes the user to the forgot password page or register page */}
							<Link to="/forgotpwrduser" style={{ marginLeft: "10px" }}>
								Glemt passord?
							</Link>
							<Link to="/register" style={{ marginLeft: "20px" }}>
								Har du ikke bruker? Klikk her!{" "}
							</Link>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};
//The component is exported as a default export.
export default LoginForm;
