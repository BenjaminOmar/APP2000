import React, { useState } from "react";
import { Form, Button, Card, Modal, ModalHeader } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
	// Declare state variables to hold user and messages
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [ssn, setSsn] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isFlipped, setIsFlipped] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [totalReactPackages, setTotalReactPackages] = useState(0);

	const handleUsernameChange = (value) => {setUsername(value);};
	const handleFirstNameChange = (value) => {setFirstName(value);};
	const handleMiddleNameChange = (value) => {setMiddleName(value);};
	const handleLastNameChange = (value) => {setLastName(value);};
	const handleEmailChange = (value) => {setEmail(value);};
	const handlePhoneChange = (value) => {setPhone(value);};
	const handleSsnChange = (value) => {setSsn(value);};
	const handleAddressChange = (value) => {setAddress(value);};
	const handleZipCodeChange = (value) => {setZipCode(value);};
	const handlePasswordChange = (value) => {setPassword(value);};

	//Handle form submit event
	const handleSubmit = async (event) => {
		//prevents the page from reloading when the form is submitted
		event.preventDefault();

		//Error handling
		if (username.length < 5) {
			setMessage("Brukernavnet må inneholde minst 5 karakterer");
			setShowModal(true);
			return;
		}
		if (!/^\d{11}$/.test(ssn) || !/^\d+$/.test(ssn)) {
			setMessage("Personnummer må inneholde 11 tall");
			setShowModal(true);
			return;
		}
		if (zipCode.length !== 4) {
			setMessage("Postnummer må inneholde 4 tall");
			setShowModal(true);
			return;
		}
		if (!/[a-zA-ZæøåÆØÅ]/.test(password) || !/[0-9]/.test(password)) {
			setMessage(
				"Passordet må inneholde mist 8 karakterer, inkludert minst en bokstav og ett nummer"
			);
			setShowModal(true);
			return;
		}
		if (password !== confirmPassword) {
			setMessage("Passordene du har skrevet inn er ikke like");
			setShowModal(true);
			return;
		}

		//check if zipcode is in online api with zipCodes in Norway
		checkZip(parseInt(zipCode), setMessage, setShowModal);

		const data ={			
			firstName: firstName.trim(),
			middleName: middleName.trim(),
			lastName: lastName.trim(),
			phoneNumber: parseInt(phone.trim()),
			socialSecurityNum: parseInt(ssn.trim()),
			address: address.trim(),
			zipCode: parseInt(zipCode.trim()),
			password: password.trim(),
			username: username.trim(),
			email: email.trim(),
		};
		const apiUrl = process.env.REACT_APP_API_URL;
		const REGISTER_USER_URL = apiUrl + "/User/register";
			axios.post(REGISTER_USER_URL,data).then((result) =>{
				setMessage(result.data);
				setShowModal(true);					
			}).catch((error) =>{
				setMessage(error);
				setShowModal(true);
			})
		
	


		

		//Send input to server to check if user already exists, id user does not exist send information to database
		
		
		
		//try {
		// 	const registerResponse = await fetch(
		// 		"https://localhost:7209/api/User/register",
		// 		{
		// 			method: "POST",
		// 			headers: { "Content-Type": "application/json" },
		// 			body: JSON.stringify({
		// 				firstName: firstName.trim(),
			// 			middleName: middleName.trim(),
			// 			lastName: lastName.trim(),
			// 			phoneNumber: parseInt(phone.trim()),
			// 			socialSecurityNum: parseInt(ssn.trim()),
			// 			address: address.trim(),
			// 			zipCode: parseInt(zipCode.trim()),
			// 			password: password.trim(),
			// 			username: username.trim(),
			// 			email: email.trim(),
		// 			}),
		// 		}
		// 	);
		// 	const data = await registerResponse.json();
		// 	setMessage(`Bruker registrert vellykket. Informasjon: ${JSON.stringify(data)}`);
		// 	setShowModal(true);
		// 	//Shows the user that the registration is successful with information about what har been registered in 5 sec and then navigates to login. 
		// 	setTimeout(() => {
		// 			navigate.push("/login");
		// 	}, 5000);			
		// } catch (error) {
		// 	console.error(error);
		// 	setMessage("En feil oppstod under registrering av bruker.");
		// 	setShowModal(true);
		// }
	};

	const checkZip = async (zipCode, setMessage, setShowModal) => {
		const response = await fetch("https://webapi.no/api/v1/zipcode/" + zipCode);
		const data = await response.json();
		setTotalReactPackages(data.total);

		if (data.data.zipCode !== zipCode) {
			setMessage(
				"Postkoden du har tastet inn er ikke en gylidig norsk postkode"
			);
			setShowModal(true);
			return;
		}
	};

	//flipp card function
	const handleFlipCard = () => {
		setIsFlipped(!isFlipped);
	};
	// close error message
	const handleClose = () => {
		setMessage("");
	};

	// handle forgotten user/pswrd modal
	// const handleShowForgotModal = () => {
	// 	setShowForgotModal(true);
	// };

	return (
		<div
			className="d-flex justify-content-center align-items-start min-vh-100"
			style={{ paddingTop: "0px", position: "relative" }}>
			{/*A Card component from bootstrap-react that is used to display the Register form.*/}
			<Form onSubmit={handleSubmit}>
				{/*Display error message if there is one*/}
				{message && (
					<Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
						<ModalHeader closeButton onClick={handleClose} />
						<Modal.Body>{message}</Modal.Body>
					</Modal>
				)}
				<Card style={{ width: "500px", marginBottom: "50px" }}>
					<Card.Header>
						<h3> Registrer Bruker</h3>
					</Card.Header>
					<Card.Body>
						<Form.Group style={{ marginBottom: "15px" }} controlId="username">
							<Form.Label>Brukernavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Ønsket brukernavn"
								value={username}
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
								value={middleName}
								onChange={(e) => handleMiddleNameChange(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="lastName" style={{ marginBottom: "15px" }}>
							<Form.Label>Etternavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Etternavn"
								value={lastName}
								onChange={(e) => handleLastNameChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="email" style={{ marginBottom: "15px" }}>
							<Form.Label>Epost:</Form.Label>
							<Form.Control
								type="email"
								placeholder="Epost"
								value={email}
								onChange={(e) => handleEmailChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="phone" style={{ marginBottom: "15px" }}>
							<Form.Label>Telefonnummer:</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Telefonnummer"
								value={phone}
								onChange={(e) => handlePhoneChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="ssn" style={{ marginBottom: "15px" }}>
							<Form.Label>Personnummer, 11 tall:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Personnummer"
								value={ssn}
								onChange={(e) => handleSsnChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="address" style={{ marginBottom: "15px" }}>
							<Form.Label>Addresse:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Adresse"
								value={address}
								onChange={(e) => handleAddressChange(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="zipCode">
							<Form.Label>Postnummer, 4 tall:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Postnummer"
								value={zipCode}
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
								value={password}
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
								onClick={handleFlipCard}
								className="flipLink"
								style={{ marginLeft: "50px" }}>
								Til logg inn{" "}
							</Link>
						
						
					</Card.Body>
				</Card>
			</Form>
		</div>
	);
};

export { RegisterForm };