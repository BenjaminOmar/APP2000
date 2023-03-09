// Gjenstår:
// Flipp funksjon til login
// Postnummer sjekk mot api? 
// error meling i .catch

import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Modal} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
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
	

	//Functions that sets the value based on the value passed in as a parameter from the form. 
	const handleFirstNameChange = (value) => {setFirstName(value);};
	const handleMiddleNameChange = (value) => {setMiddleName(value);};
	const handleLastNameChange = (value) => {setLastName(value);};
	const handlePhoneNumberChange = (value) => {setPhoneNumber(value);};
	const handleSsnChange = (value) => {setSsn(value);};
	const handleAdressChange = (value) => {setAdress(value);};
	const handleZipCodeChange = (value) => {setZipCode(value);};
	const handlePasswordChange = (value) => {setPassword(value);};
	const handleUsernameChange = (value) => {setUsername(value);};
	const handleEmailChange = (value) => {setEmail(value);};

	//Function that sends the user input to backend api or returns a errorMessage if something fails.  
	const handleSave = async (event) => {
		event.preventDefault();
		//Error handling
		if (Username.length < 5 || Username.includes(" ")) {
			setMessage("Brukernavnet må inneholde minst 5 karakterer og kan ikke inneholde mellomrom");
			setShowModal(true);
			return;			
		}
		if (!/^\d+$/.test(PhoneNumber)) {
			setMessage("Telefonnummeret kan bare inneholde tall");
			setShowModal(true);
			return;
		  }
		if (!/^\d{11}$/.test(Ssn) || !/^\d+$/.test(Ssn)) {
			setMessage("Personnummer må inneholde 11 tall");
			setShowModal(true);
			return;
		}
		if (ZipCode.length !== 4) {
			setMessage("Postnummer må inneholde 4 tall");
			setShowModal(true);
			return;
		}
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
		//

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
		const url = "https://localhost:7209/api/User/register";
		axios
			.post(url, data)
			.then((result) => {
				// alert(result.data);
				setMessage("Bruker registrert");
				setShowModal(true);
				setTimeout(() => {
					setShowModal(false);
					setMessage("");
					navigate("/login");
				  }, 3000);
				})
			.catch((error) => {
				alert(error);
			});
	};

	//Empty error message
	const handleClose = () => {
		setMessage("");
		
	};

	

	return (
		
	
		<div
			className="d-flex justify-content-center align-items-start min-vh-100"
			style={{ paddingTop: "0px", position: "relative" }}>
			{/*A Card component from bootstrap-react that is used to display the Register form.*/}
			<Form onSubmit={handleSave}>
				{/*Display error message if there is one*/}
				{message && (
					<Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
						<Modal.Header closeButton onClick={handleClose} style= {{marginBottom: '5px'}}> <h5>Obs!</h5> </Modal.Header>
						<Modal.Body>{message}</Modal.Body>
					</Modal>
					
				)}
				<Card style={{ width: "500px", marginBottom: "50px" }}>
					<Card.Header>
						<h3> Registrer Bruker</h3>
					</Card.Header>
					<Card.Body>
						<Form.Group style={{ marginBottom: "15px" }} controlId="username">
							<Form.Label style={{ marginBottom: "-5px" }}>Brukernavn:
								<p style={{ fontSize: "10px" }}>								
									(Minimum 5 karakterer og uten mellomrom)
								</p>							
							</Form.Label>							
							<Form.Control
								type="Text"
								placeholder="Ønsket brukernavn"
								value={Username}
								onChange={(e) => handleUsernameChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="firstName">
							<Form.Label>Fornavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Fornavn"
								value={firstName}
								onChange={(e) => handleFirstNameChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="middleName">
							<Form.Label>Mellomnavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Mellomnavn"
								value={MiddleName}
								onChange={(e) => handleMiddleNameChange(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="lastName" style={{ marginBottom: "15px" }}>
							<Form.Label>Etternavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Etternavn"
								value={LastName}
								onChange={(e) => handleLastNameChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="email" style={{ marginBottom: "15px" }}>
							<Form.Label>Epost:</Form.Label>
							<Form.Control
								type="email"
								placeholder="Epost"
								value={Email}
								onChange={(e) => handleEmailChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="phone" style={{ marginBottom: "15px" }}>
							<Form.Label>Telefonnummer:</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Telefonnummer"
								value={PhoneNumber}
								onChange={(e) => handlePhoneNumberChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="ssn" style={{ marginBottom: "15px" }}>
							<Form.Label>Personnummer, 11 tall:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Personnummer"
								value={Ssn}
								onChange={(e) => handleSsnChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="address" style={{ marginBottom: "15px" }}>
							<Form.Label>Addresse:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Adresse"
								value={Adress}
								onChange={(e) => handleAdressChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="zipCode">
							<Form.Label>Postnummer, 4 tall:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Postnummer"
								value={ZipCode}
								onChange={(e) => handleZipCodeChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="password" style={{ marginBottom: "15px" }}>
							<Form.Label style={{ marginBottom: "-5px" }}>
								Passord:
								<p style={{ fontSize: "10px" }}>
									{" "}
									(minimum 8 karakterer, derav minimum en bokstav og ett tall)
								</p>
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Passord"
								value={Password}
								onChange={(e) => handlePasswordChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group
							controlId="confirmPassword"
							style={{ marginBottom: "15px" }}>
							<Form.Label>Gjenta passord:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Gjenta passord"
								value={confirmPassword}
								onChange={(e) =>setConfirmPassword(e.target.value)}
								required
							/>
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							style={{
								paddingLeft: "150px",
								paddingRight: "150px",
								marginTop: "30px",
								marginLeft: "35px",
								backgroundColor: "#0050B1",
							}}>
							Register Bruker
						</Button>
						<Form.Group style={{ marginTop: "30px" }}>
							{/*Link components that takes the user to the forgot password page or login page */}
							<Link								
								to="/forgotpwrduser"
								style={{ marginLeft: "50px" }}>
								Glemt passord eller brukernavn?
							</Link>
						</Form.Group>
						<Form.Group style={{ marginTop: "10px" }}></Form.Group>
							<Link
								to="/login"
								className="flipLink"
								style={{ marginLeft: "50px" }}>
								Til logg inn{" "}
							</Link>					
					</Card.Body>
				</Card>
			</Form>
		</div>				
	);
}

export default RegisterForm;
