import HeaderAdmin from "../components/HeaderAdmin";
import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";

function AdminEditUser() {
	const [searchInput, setSearchInput] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedUser, setSelectedUser] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		phoneNumber: "",
		socialSecurityNum: "",
		adress: "",
		zipCode: "",
		roleId: "",
		password: "",
		regDate: "",
		username: "",
		email: "",
	});
	const [showEditForm, setShowEditForm] = useState(false);
	
	const handleSearch = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("https://localhost:7209/api/user/getAll");
			const data = await response.json();
			const filteredResults = data.filter(
				(user) =>
					user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
					user.middleName?.toLowerCase().includes(searchInput.toLowerCase()) ||
					user.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
					user.socialSecurityNum.includes(searchInput)
			);
			setSearchResults(filteredResults);
			setSelectedUser(filteredResults[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUserSelect = async (user) => {
		setSelectedUser((prevSelectedUser) =>
			prevSelectedUser === user ? null : user
		);
		try {
			const response = await fetch(
				`https://localhost:7209/api/user/getAll/${user.userId}`
			);
			const userData = await response.json();
			setSelectedUser(userData);
			setShowEditForm(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setSelectedUser((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		fetch("https://localhost:7209/api/user/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(selectedUser),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error updating user data");
				}
				return response.json();
			})
			.then((data) => {
				console.log("User data updated:", data);
				setSelectedUser(data); // oppdaterer skjemaet med nye data
			})
			.catch((error) => {
				console.error("Error updating user data:", error);
			});
	};

	return (
		<>
			<HeaderAdmin />
			<Form.Group>
				<Form.Control
					type="text"
					placeholder="Søk på fornavn, etternavn eller personnummer"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
			</Form.Group>
			<Button variant="primary" onClick={handleSearch}>
				Søk
			</Button>

			{searchResults.length > 0 && (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Velg bruker</th>
							<th>Fornavn</th>
							<th>Mellomnavn</th>
							<th>Etternavn</th>
							<th>Personnummer</th>
						</tr>
					</thead>
					<tbody>
						{searchResults.map((user) => (
							<tr key={user.userId} onClick={() => handleUserSelect(user)}>
								<td>
									<input
										type="checkbox"
										name="selectedUser"
										onChange={() => setSelectedUser(user)}
										checked={user === selectedUser}
									/>
								</td>
								<td>{user.firstName}</td>
								<td>{user.middleName}</td>
								<td>{user.lastName}</td>
								<td>{user.socialSecurityNum}</td>
							</tr>
						))}
					</tbody>
					{selectedUser && (
						<Button variant="primary" onClick={() => setShowEditForm(true)}>
							Velg bruker
						</Button>
					)}
				</Table>
			)}
			{selectedUser && showEditForm && (
				<Form onSubmit={handleFormSubmit}>
					<Form.Group controlId="formBasicFirstName">
						<Form.Label>Fornavn</Form.Label>
						<Form.Control
							type="text"
							name="firstName"
							value={selectedUser.firstName}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicMiddleName">
						<Form.Label>Middle Name</Form.Label>
						<Form.Control
							type="text"
							name="middleName"
							value={selectedUser.middleName}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicLastName">
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							type="text"
							name="lastName"
							value={selectedUser.lastName}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPhoneNumber">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							type="number"
							name="phoneNumber"
							value={selectedUser.phoneNumber}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicSocialSecurityNum">
						<Form.Label>Social Security Number</Form.Label>
						<Form.Control
							type="text"
							name="socialSecurityNum"
							value={selectedUser.socialSecurityNum}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicAdress">
						<Form.Label>Address</Form.Label>
						<Form.Control
							type="text"
							name="adress"
							value={selectedUser.adress}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicZipCode">
						<Form.Label>Zip Code</Form.Label>
						<Form.Control
							type="text"
							name="zipCode"
							value={selectedUser.zipCode}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicRoleId">
						<Form.Label>Role ID</Form.Label>
						<Form.Control
							type="number"
							name="roleId"
							value={selectedUser.roleId}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							name="password"
							value={selectedUser.password}
							onChange={handleFormChange}
						/>
					</Form.Group>

					<Button variant="primary" type="submit" onClick={handleFormSubmit}>
						Oppdater bruker
					</Button>
				</Form>
			)}
		</>
	);
}

export default AdminEditUser;
