import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
	//Declare state variables to hold user information and messages. 
	const [firstName, setFirstName] = useState("");
	const [MiddleName, setMiddleName] = useState("");
	const [LastName, setLastName] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("");
	const [Ssn, setSsn] = useState("");
	const [Adress, setAdress] = useState("");
	const [ZipCode, setZipCode] = useState("");
	const [RoleId, setRoleId] = useState("");
	const [Password, setPassword] = useState("");
	const [Username, setUsername] = useState("");
	const [Email, setEmail] = useState("");

	//Functions that sets the value based on the value passed in as a parameter from the form. 
	const handleFirstNameChange = (value) => {setMiddleName(value);};
	const handleMiddleNameChange = (value) => {setFirstName(value);};
	const handleLastNameChange = (value) => {setLastName(value);};
	const handlePhoneNumberChange = (value) => {setPhoneNumber(value);};
	const handleSsnChange = (value) => {setSsn(value);};
	const handleAdressChange = (value) => {setAdress(value);};
	const handleZipCodeChange = (value) => {setZipCode(value);};
	const handleRoleIdChange = (value) => {setRoleId(value);};
	const handlePasswordChange = (value) => {setPassword(value);};
	const handleUsernameChange = (value) => {setUsername(value);};
	const handleEmailChange = (value) => {setEmail(value);};

		//Function that sends the user input to backend api or returns a errorMessage if something fails.  
	const handleSave = () => {
		const data = {
			FirstName: firstName,
			MiddleName: MiddleName,
			LastName: LastName,
			PhoneNumber: PhoneNumber,
			SocialSecurityNum: Ssn,
			Adress: Adress,
			ZipCode: ZipCode,
			RoleId: RoleId,
			Password: Password,
			Username: Username,
			Email: Email,
		};
		const url = "https://localhost:7209/api/User/register";
		axios
			.post(url, data)
			.then((result) => {
				alert(result.data);
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<>
			<div>Registration</div>
			<div>
				<label>First name</label>
				<input
					type="text"
					id="txtFirstName"
					onChange={(e) => handleFirstNameChange(e.target.value)}></input>
			</div>
			<div>
				<label>Middle name</label>
				<input
					type="text"
					id="txtMiddleName"
					onChange={(e) => handleMiddleNameChange(e.target.value)}></input>
			</div>
			<div>
				<label>Last name</label>
				<input
					type="text"
					id="txtLastName"
					onChange={(e) => handleLastNameChange(e.target.value)}></input>
			</div>
			<div>
				<label>Phonenumber</label>
				<input
					type="text"
					id="phoneNumber"
					onChange={(e) => handlePhoneNumberChange(e.target.value)}></input>
			</div>
			<div>
				<label>ssn</label>
				<input
					type="text"
					id="txtSsn"
					onChange={(e) => handleSsnChange(e.target.value)}></input>
			</div>
			<div>
				<label>Adress</label>
				<input
					type="text"
					id="txtAdress"
					onChange={(e) => handleAdressChange(e.target.value)}></input>
			</div>
			<div>
				<label>Zipcode</label>
				<input
					type="text"
					id="txtZipCode"
					onChange={(e) => handleZipCodeChange(e.target.value)}></input>
			</div>
			<div>
				<label>Role Id</label>
				<input
					type="text"
					id="txtRoleId"
					onChange={(e) => handleRoleIdChange(e.target.value)}></input>
			</div>
			<div>
				<label>Password</label>
				<input
					type="text"
					id="txtPassword"
					onChange={(e) => handlePasswordChange(e.target.value)}></input>
			</div>
			<div>
				<label>Username</label>
				<input
					type="text"
					id="txtUsername"
					onChange={(e) => handleUsernameChange(e.target.value)}></input>
			</div>
			<div>
				<label>Email</label>
				<input
					type="text"
					id="txtEmail"
					onChange={(e) => handleEmailChange(e.target.value)}></input>
			</div>
			<button onClick={() => handleSave()}>Save</button>
		</>
	);
}

export default RegisterForm;
