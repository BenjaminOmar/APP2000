import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterForm = () => {
	// Declare state variables to hold user and error messages
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [ssn, setSsn] = useState("");
	const [address, setAddress] = useState("");
	const [zipCode, setZipcode] = useState("");
	const [city, setCity] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isFlipped, setIsFlipped] = useState(false);

	const apiUrl = process.env.RAECT_APP_API_URL;

	//Handle form submit event
	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			password !== confirmPassword ||
			!/[a-åA-Å]/.test(password) ||
			/[0-9]/.test(password) ||
			password.length < 8
		) {
			setErrorMessage(
				"Passordet må inneholde mist 8 karakterer, inkludert minst en bokstav og ett nummer"
			);
			return;
		}

		if (password !== confirmPassword) {
			setErrorMessage("Passordene er ikke like");
			return;
		}

		//Send under input to server to check if user already exists
		fetch(apiUrl + "/User/check", {
			method: "POST",
			headers: { "Content Type": "application/json" },
			body: JSON.stringify({ username, ssn }),
		})
			.then((response) => {
				if (response.ok) {
					//User does not exist, submit registration
					return fetch(apiUrl + "User/register", {
						method: "POST",
						headers: { "Content Type": "application/json" },
						body: JSON.stringify({
							username: username.trim(),
							firstName: firstName.trim(),
							middleName: middleName.trim(),
							lastName: lastName.trim(),
							email: email.trim(),
							phone: phone.trim(),
							ssn: ssn.trim(),
							address: address.trim(),
							zipCode: zipCode.trim(),
							password: password.trim(),
						}),
					});
				} else {
					//User already exists, show error message
					setErrorMessage("Brukernavn opptatt");
					return Promise.reject("Bruker finnes fra før av");
				}
			})
			.then((response) => response.json())
			.then((data) => {
				//Registration successfully, show message and user information.
				setErrorMessage("");
				alert("Bruker registrert vellykket. Informasjon: ");
			})
			.catch((error) => console.error(error));
	};
	//flipp card function
	const handleFlipCard = () => {
		setIsFlipped(!isFlipped);
	};
	// close error message
	const handleClose = () => {
		setErrorMessage("");
	};
	// Function that makes a GET request to the server with the postal code parameter, and updates the postal location in the state
	const handleZipcodeChange = (event) => {
		const zipcode = event.targe.value;
		if (zipcode.length === 4) {
			fetch(apiUrl + "/city/getcity")
				.then((response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Ugyldig postnummer");
					}
				})
				.then((data) => {
					setCity(data.city);
				})
				.catch((error) => {
					setErrorMessage(error.message);
				});
		} else {
			setCity("");
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-start min-vh-100"
			style={{ paddingTop: "0px", position: "relative" }}>
			{/*A Card component from bootstrap-react that is used to display the Register form.*/}
			<Form onSubmit={handleSubmit}>
				{errorMessage && (
					<Alert variant="danger" onClose={handleClose} dismissible>
						<Alert.Heading>Feil i skjema!</Alert.Heading>
						<p>{errorMessage}</p>
					</Alert>
				)}
				<Card style={{ width: "500px", marginBottom: "50px" }}>
					{/*Display error message if there is one*/}
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
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="firstName">
							<Form.Label>Fornavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Fornavn"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="middleName">
							<Form.Label>Mellomnavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Mellomnavn"
								value={middleName}
								onChange={(e) => setMiddleName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="lastName" style={{ marginBottom: "15px" }}>
							<Form.Label>Etternavn:</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Etternavn"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="email" style={{ marginBottom: "15px" }}>
							<Form.Label>Epost:</Form.Label>
							<Form.Control
								type="email"
								placeholder="Epost"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="phone" style={{ marginBottom: "15px" }}>
							<Form.Label>Telefonnummer:</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Telefonnummer"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group controlId="ssn" style={{ marginBottom: "15px" }}>
							<Form.Label>Personnummer, 12 siffer:</Form.Label>
							<Form.Control
								type="number"
								placeholder="Personnummer"
								value={ssn}
								onChange={(e) => setSsn(e.target.value)}
								maxLength="12"
								required
							/>
						</Form.Group>
						<Form.Group controlId="address" style={{ marginBottom: "15px" }}>
							<Form.Label>Addresse:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Adresse"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group style={{ marginBottom: "15px" }} controlId="zipCode">
							<Form.Label>Postnummer:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Postnummer"
								// value={zipCode}
								onChange={handleZipcodeChange}
								maxLength="4"
								required
							/>
						</Form.Group>
						<Form.Group controlId="city" style={{ marginBottom: "15px" }}>
							<Form.Label>Poststed:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Poststed"
								value={city}
								readOnly
								required
							/>
						</Form.Group>
						<Form.Group controlId="password" style={{ marginBottom: "15px" }}>
							<Form.Label>Passord:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Passord"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
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
								onChange={(e) => setConfirmPassword(e.target.value)}
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
							<Link to="/forgotPassword" style={{ marginLeft: "50px" }}>
								Glemt passord?
							</Link>
							<Link
								to="/login"
								onClick={handleFlipCard}
								className="flipLink"
								style={{ marginLeft: "50px" }}>
								Har du bruker? Klikk her!{" "}
							</Link>
						</Form.Group>
					</Card.Body>
				</Card>
			</Form>
		</div>
	);
};

export { RegisterForm };
