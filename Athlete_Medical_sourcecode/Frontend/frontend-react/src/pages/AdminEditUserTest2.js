import React, { useState } from "react";
import axios from "axios";

function Registration() {
	const [firstName, setFirstName] = useState("");
	const [id, setId] = useState("");
	const [MiddleName, setMiddleName] = useState("");
	const [LastName, setLastName] = useState("");
	const [PhoneNumber, setPhoneNumber] = useState("");
	const [Ssn, setSsn] = useState("");
	const [Adress, setAdress] = useState("");
	const [ZipCode, setZipCode] = useState("");
	const [RoleId, setRoleId] = useState("");
	const [Password, setPassword] = useState("");

	const [Email, setEmail] = useState("");

	const handleFirstNameChange = (value) => {
		setMiddleName(value);
	};
	const handleIdChange = (value) => {
		setId(value);
	};
	const handleMiddleNameChange = (value) => {
		setFirstName(value);
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
	const handleRoleIdChange = (value) => {
		setRoleId(value);
	};
	const handlePasswordChange = (value) => {
		setPassword(value);
	};
	
	const handleEmailChange = (value) => {
		setEmail(value);
	};

	const handleSave = () => {
		const data = {
			userId: id,
			FirstName: firstName,
			MiddleName: MiddleName,
			LastName: LastName,
			PhoneNumber: PhoneNumber,
			SocialSecurityNum: Ssn,
			Adress: Adress,
			ZipCode: ZipCode,
			RoleId: RoleId,
			Password: Password,
			
			Email: Email,
		};
		const url = "https://localhost:7209/api/user/update";
		axios
			.put(url, data)
			.then((result) => {
				alert(result.data);
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<>
			<div>Update User</div>
			<div>
				<label>Id</label>
				<input
					type="text"
					id="txtId"
					onChange={(e) => handleIdChange(e.target.value)}></input>
			</div>
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

export default Registration;
