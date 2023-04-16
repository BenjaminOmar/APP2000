/*This code defines a functional React component that displays a registration form to register users. 
The component contains several state change functions to update input fields when the user enters information into the form. 
When the user submits the form, the code validates input fields and sends a POST request to a backend API to store the user 
information in a database. If the registration is successful, the code displays a modal dialog with a 
message that the user is registered, before navigating the user to the login page after three seconds.
*/

// import required components from libraries
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Modal, OverlayTrigger } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { Tooltip } from "react-bootstrap";

//define a functional component
function RegisterForm({ setShowFrontProp }) {
	//Declare state variables to hold user information and messages.
	const [firstName, setFirstName] = useState("");
	const [MiddleName, setMiddleName] = useState("");
	const [LastName, setLastName] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("");
	const [Ssn, setSsn] = useState("");
	const [Adress, setAdress] = useState("");
	const [ZipCode, setZipCode] = useState("");
	const [Password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [Username, setUsername] = useState("");
	const [Email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const handleLoginClick = () => {
		setShowFrontProp(true);
	};

	//Functions that sets value based on the value passed in as a parameter from the form.
	const handleFirstNameChange = (value) => {
		setFirstName(value);
	};
	const handleMiddleNameChange = (value) => {
		setMiddleName(value);
	};
	const handleLastNameChange = (value) => {
		setLastName(value);
	};
	const handlePhoneNumberChange = (value) => {
		setPhoneNumber(value);
	};
	const handleSsnChange = (value) => {
		setSsn(value);
	};
	const handleAdressChange = (value) => {
		setAdress(value);
	};
	const handleZipCodeChange = (value) => {
		setZipCode(value);
	};
	const handlePasswordChange = (value) => {
		setPassword(value);
	};
	const handleUsernameChange = (value) => {
		setUsername(value);
	};
	const handleEmailChange = (value) => {
		setEmail(value);
	};

	//Function that sends the user input to backend api or returns a errorMessage if something fails.
	const handleSave = async (event) => {
		event.preventDefault();
		//Error handling
		//Validate user name
		if (Username.length < 5 || Username.includes(" ")) {
			setMessage(
				"Brukernavnet må inneholde minst 5 karakterer og kan ikke inneholde mellomrom"
			);
			setShowModal(true);
			return;
		}
		//Validate phone number
		if (!/^\d+$/.test(PhoneNumber)) {
			setMessage("Telefonnummeret kan bare inneholde tall");
			setShowModal(true);
			return;
		}
		//validate ssn
		if (!/^\d{11}$/.test(Ssn) || !/^\d+$/.test(Ssn)) {
			setMessage("Personnummer må inneholde 11 tall");
			setShowModal(true);
			return;
		}
		//Validate zip code
		if (ZipCode.length !== 4) {
			setMessage("Postnummer må inneholde 4 tall");
			setShowModal(true);
			return;
		}
		const isValidZipCode = await validateZipCode(ZipCode);
		if (!isValidZipCode) {
			setMessage("Ugyldig postnummer");
			setShowModal(true);
			return;
		}
		//Validate password
		if (Password === Username) {
			setMessage("Passordet kan ikke være det samme som brukernavnet");
			setShowModal(true);
			return;
		}
		if (!/[a-zA-ZæøåÆØÅ]/.test(Password) || !/[0-9]/.test(Password)) {
			setMessage(
				"Passordet må inneholde mist 8 karakterer, inkludert minst en bokstav og ett nummer"
			);
			setShowModal(true);
			return;
		}
		if (Password !== confirmPassword) {
			setMessage("Passordene du har skrevet inn er ikke like");
			setShowModal(true);
			return;
		}

		//create an object 'data' with properties for the user's registration information.
		const data = {
			FirstName: firstName,
			MiddleName: MiddleName,
			LastName: LastName,
			PhoneNumber: PhoneNumber,
			SocialSecurityNum: Ssn,
			Adress: Adress,
			ZipCode: ZipCode,
			RoleId: 1,
			Password: Password,
			Username: Username,
			Email: Email,
		};
		// Specify the URL to send the registration data to.
		const url = "https://localhost:7209/api/User/register";
		// Use the `axios.post()` method to send the registration data to the specified URL.
		axios
			.post(url, data)
			//If the request is successful, display a success message to the user in a modal dialog.
			.then(() => {
				// clear the form inputs
				setFirstName("");
				setMiddleName("");
				setLastName("");
				setPhoneNumber("");
				setSsn("");
				setAdress("");
				setZipCode("");
				setPassword("");
				setUsername("");
				setEmail("");
				setConfirmPassword("");
				// display a success message to the user in a modal dialog
				setMessage("Bruker registrert");
				// After a delay of 3 seconds, close the modal and navigate to the login page.
				setShowModal(true);
				setTimeout(() => {
					setShowModal(false);
					setMessage("");
					navigate("/login");
				}, 3000);
			})
			// If the request fails, display an error message from backend to the user in a modal.
			.catch((error) => {
				setMessage(error.message);
				setShowModal(true);
				return;
			});
	};

	// A function that empty error message
	const handleClose = () => {
		setMessage("");
	};

	// A function that validates the zipcode making a request to the Zippopotamus.us API
	async function validateZipCode(zipCode) {
		try {
			//Construct the API url using the zip code and country code.
			const url = `https://api.zippopotam.us/no/${zipCode}`;
			//making a get request to the API an wait for response
			const response = await axios.get(url);
			//check if the response status is 200(OK) and return the result
			return response.status === 200;
		} catch (error) {
			//Show error message to user if validation fail
			setMessage("En feil oppstod ved validering av postnummer");
			setShowModal(true);
			return false;
		}
	}

	// Define a tooltip component for a social security number input field
	const ssnTooltip = (
		<Tooltip id="tooltip">Personnummer må være 11 siffer</Tooltip>
	);

	// Define a tooltip component for a zip code input field
	const zipCodeTooltip = (
		<Tooltip id="tooltip">postnummer må være 4 siffer</Tooltip>
	);

	// Define a tooltip component for a username input field
	const usernameTooltip = (
		<Tooltip id="tooltip">
			brukernavn må inneholde: <br></br> -  minst 5 tegn <br></br> - være uten
			mellomrom
		</Tooltip>
	);

	// Define a tooltip component for a password input field
	const passwordTooltip = (
		<Tooltip id="tooltip">
			passord må inneholde: <br></br> - 8 siffer <br></br> - en alphanumerisk
			karakter <br></br> - et tall
		</Tooltip>
	);

	return (
		<div
			className="d-flex justify-content-center align-items-start min-vh-100"
			style={{
				paddingTop: "50px",
				position: "relative",
				marginBottom: "100px",
			}}>
			{/*A Card component from bootstrap-react that is used to display the Register form.*/}
			<Form onSubmit={handleSave}>
				{/*Display  message if there is one*/}
				{message && (
					<Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
						<Modal.Header
							closeButton
							onClick={handleClose}
							style={{ marginBottom: "5px" }}
						>
						</Modal.Header>
						<Modal.Body>{message}</Modal.Body>
					</Modal>
				)}
				<div className="flipCard">
					{/* Card component from a UI library */}
					<Card className="card-container" style={{ width: "500px" }}>
						{/*Card Header component */}
						<Card.Header>
							<h3> Registrer Bruker</h3>
						</Card.Header>
						{/* Card Body component */}
						<Card.Body style={{ width: "480px" }}>
							{/*Form.Group component*/}
							<Card.Text className="left">
								<OverlayTrigger placement="left" overlay={usernameTooltip}>
									<Form.Group
										style={{ marginBottom: "15px" }}
										controlId="username">
										{/* Label component with text and instructions */}
										<Form.Label style={{ marginBottom: "15px" }}>
											Brukernavn:
										</Form.Label>
										{/*Form.Control component with attributes like type, placeholder, and value*/}
										<Form.Control
											type="Text"
											placeholder="Ønsket brukernavn"
											value={Username}
											// onChange event handler
											onChange={(e) => handleUsernameChange(e.target.value)}
											required
										/>
									</Form.Group>
								</OverlayTrigger>
								{/*Form.Group component*/}
								<Form.Group
									style={{ marginBottom: "15px" }}
									controlId="firstName">
									{/* Label component with text*/}
									<Form.Label>Fornavn:</Form.Label>
									{/*Form.Control component with attributes like type, placeholder, and value*/}
									<Form.Control
										type="Text"
										placeholder="Fornavn"
										value={firstName}
										// onChange event handler
										onChange={(e) => handleFirstNameChange(e.target.value)}
										required
									/>
								</Form.Group>
								{/*Form.Group component*/}
								<Form.Group
									style={{ marginBottom: "15px" }}
									controlId="middleName">
									{/* Label component with text*/}
									<Form.Label>Mellomnavn:</Form.Label>
									{/*Form.Control component with attributes like type, placeholder, and value*/}
									<Form.Control
										type="Text"
										placeholder="Mellomnavn"
										value={MiddleName}
										// onChange event handler
										onChange={(e) => handleMiddleNameChange(e.target.value)}
									/>
								</Form.Group>
								{/*Form.Group component*/}
								<Form.Group
									controlId="lastName"
									style={{ marginBottom: "15px" }}>
									{/* Label component with text*/}
									<Form.Label>Etternavn:</Form.Label>
									{/*Form.Control component with attributes like type, placeholder, and value*/}
									<Form.Control
										type="Text"
										placeholder="Etternavn"
										value={LastName}
										// onChange event handler
										onChange={(e) => handleLastNameChange(e.target.value)}
										required
									/>
								</Form.Group>
								{/*Form.Group component*/}
								<Form.Group controlId="email" style={{ marginBottom: "15px" }}>
									{/* Label component with text*/}
									<Form.Label>Epost:</Form.Label>
									{/*Form.Control component with attributes like type, placeholder, and value*/}
									<Form.Control
										type="email"
										placeholder="Epost"
										value={Email}
										// onChange event handler
										onChange={(e) => handleEmailChange(e.target.value)}
										required
									/>
								</Form.Group>
								{/*Form.Group component*/}
								<Form.Group controlId="phone" style={{ marginBottom: "15px" }}>
									{/* Label component with text*/}
									<Form.Label>Telefonnummer:</Form.Label>
									{/*Form.Control component with attributes like type, placeholder, and value*/}
									<Form.Control
										type="tel"
										placeholder="Telefonnummer"
										value={PhoneNumber}
										// onChange event handler
										onChange={(e) => handlePhoneNumberChange(e.target.value)}
										required
									/>
								</Form.Group>
							</Card.Text>
							<Card.Text className="right">
								{/*Form.Group component*/}
								<OverlayTrigger placement="right" overlay={ssnTooltip}>
									<Form.Group controlId="ssn" style={{ marginBottom: "15px" }}>
										{/* Label component with text and instructions */}
										<Form.Label style={{ marginBottom: "15px" }}>
											Personnummer, 11 tall:
										</Form.Label>
										{/*Form.Control component with attributes like type, placeholder, and value*/}
										<Form.Control
											type="text"
											placeholder="Personnummer"
											value={Ssn}
											// onChange event handler
											onChange={(e) => handleSsnChange(e.target.value)}
											required
										/>
									</Form.Group>
								</OverlayTrigger>
								{/*Form.Group component*/}
								<Form.Group
									controlId="address"
									style={{ marginBottom: "15px" }}>
									{/* Label component with text*/}
									<Form.Label>Addresse:</Form.Label>
									{/*Form.Control component with attributes like type, placeholder, and value*/}
									<Form.Control
										type="text"
										placeholder="Adresse"
										value={Adress}
										// onChange event handler
										onChange={(e) => handleAdressChange(e.target.value)}
										required
									/>
								</Form.Group>
								{/*Form.Group component*/}
								<OverlayTrigger placement="right" overlay={zipCodeTooltip}>
									<Form.Group
										style={{ marginBottom: "15px" }}
										controlId="zipCode">
										{/* Label component with text and instructions */}
										<Form.Label>Postnummer, 4 tall:</Form.Label>
										{/*Form.Control component with attributes like type, placeholder, and value*/}
										<Form.Control
											type="text"
											placeholder="Postnummer"
											value={ZipCode}
											// onChange event handler
											onChange={(e) => handleZipCodeChange(e.target.value)}
											required
										/>
									</Form.Group>
								</OverlayTrigger>
								{/*Form.Group component*/}
								<OverlayTrigger placement="right" overlay={passwordTooltip}>
									<Form.Group
										controlId="password"
										style={{ marginBottom: "15px" }}>
										{/* Label component with text and instructions */}
										<Form.Label>Passord:</Form.Label>
										{/*Form.Control component with attributes like type, placeholder, and value*/}
										<Form.Control
											type="password"
											placeholder="Passord"
											value={Password}
											onChange={(e) => handlePasswordChange(e.target.value)}
											required
										/>
									</Form.Group>
								</OverlayTrigger>
								<Form.Group
									controlId="confirmPassword"
									style={{ marginBottom: "15px" }}>
									<Form.Label>Gjenta passord:</Form.Label>
									<Form.Control
										type="password"
										placeholder="Gjenta passord"
										value={confirmPassword}
										// onChange event handler
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
								</Form.Group>
							</Card.Text>

							{/* A submit button to register the user with specified styles */}
							<Button
								variant="primary"
								type="submit"
								style={{
									paddingLeft: "150px",
									paddingRight: "150px",
									marginLeft: "20px",
									backgroundColor: "#0050B1",
								}}>
								Register Bruker
							</Button>
							<Form.Group style={{ marginTop: "30px", marginBottom: "12px" }}>
								{/*Link components that redirect the user to the forgot password page or login page */}
								<Link to="/forgotpwrduser" style={{ marginLeft: "110px" }}>
									Glemt passord eller brukernavn?
								</Link>
							</Form.Group>
							<Form.Group style={{ marginLeft: "200px" }}>
								<Link className="loginLink" onClick={handleLoginClick}>
									Til Login
								</Link>
							</Form.Group>
						</Card.Body>
					</Card>
				</div>
			</Form>
		</div>
	);
}
// export the RegisterForm component to use it in other parts of the application
export default RegisterForm;
