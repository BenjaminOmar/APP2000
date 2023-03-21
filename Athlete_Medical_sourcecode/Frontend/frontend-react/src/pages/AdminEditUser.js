import HeaderAdmin from "../components/HeaderAdmin";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Modal } from "react-bootstrap";

function AdminEditUser() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showModal, setShowModal] = useState(false);
	
	const searchUsers = async (event) => {
		event.preventDefault();
		try{
			const response = await axios.get("https://localhost:7209/api/user/getAll");
			const data = response.data;
			const filteredResults = data.filter(
				(user) =>
					user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.middleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.socialSecurityNum.includes(searchTerm)
			);
			setSearchResults(filteredResults);
			
		} catch (error) {
			alert(error);
		};		
	  }  

	const handleSave = () => {
		const data = {
			userId: selectedUser.userId,
    		firstName: selectedUser.firstName,
			MiddleName: selectedUser.middleName,
			LastName: selectedUser.lastName,
			PhoneNumber: selectedUser.phoneNumber,
			SocialSecurityNum: selectedUser.ssn,
			Adress: selectedUser.adress,
			ZipCode: selectedUser.zipCode,
			RoleId: selectedUser.roleId,
			Password: selectedUser.password,
			username: '',
			Email: selectedUser.email,
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
			<HeaderAdmin/>

			<div style={{ marginTop: '15%', display: "flex", justifyContent: "center", alignItems: "center" }}>
				<h3>Redigere Brukerkontoer</h3>
				<p> </p>
			</div>
<div>
  <label>Search</label>
  <input
    type="text"
    placeholder="Søk på fornavn, etternavn eller personnummer"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button onClick={searchUsers}>Search</button>
</div>
{searchResults.length > 0 && (
  <Table striped bordered hover>
    <thead>
      <tr>
		<th>Rediger</th>
        <th>Brukernavn</th>

        <th>ID</th>
        <th>Fornavn</th>
        <th>Mellomnavn</th>
        <th>Etternavn</th>
        <th>Telefonnummer</th>
        <th>Addresse</th>
        <th>Postkode</th>
        <th>Rolle ID</th>
        
        <th>Epost</th>
      </tr>
    </thead>
    <tbody>
      {searchResults.map((user) => (
        <tr key={user.userId}>
		<td> 
			<Button onClick={() => {
  				setSelectedUser(user);
  				setShowModal(true);
				}}>Rediger
			</Button>
		</td>
		<td>{user.username}</td>

          <td>{user.userId}</td>
          <td>{user.firstName}</td>
          <td>{user.middleName}</td>
          <td>{user.lastName}</td>
          <td>{user.phoneNumber}</td>
          <td>{user.adress}</td>
          <td>{user.zipCode}</td>
          <td>{user.roleId}</td>
          
          <td>{user.email}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)}
{selectedUser && (
  <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Rediger bruker</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group>
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" value={selectedUser.userId} disabled />
        </Form.Group>

        <Form.Group>
          <Form.Label>Fornavn</Form.Label>
          <Form.Control type="text" value={selectedUser.firstName} onChange={(e) => {
            setSelectedUser({...selectedUser, firstName: e.target.value});
          }} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mellomnavn</Form.Label>
          <Form.Control type="text" value={selectedUser.middleName} onChange={(e) => {
            setSelectedUser({...selectedUser, middleName: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Etternavn</Form.Label>
          <Form.Control type="text" value={selectedUser.lastName} onChange={(e) => {
            setSelectedUser({...selectedUser, lastName: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Personnummer</Form.Label>
          <Form.Control type="text" value={selectedUser.ssn} onChange={(e) => {
            setSelectedUser({...selectedUser, ssn: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Telefonnummer</Form.Label>
          <Form.Control type="text" value={selectedUser.phoneNumber} onChange={(e) => {
            setSelectedUser({...selectedUser, phoneNumber: e.target.value});
          }} />
        </Form.Group>

		

		<Form.Group>
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" value={selectedUser.adress} onChange={(e) => {
            setSelectedUser({...selectedUser, adress: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Postkode</Form.Label>
          <Form.Control type="text" value={selectedUser.zipCode} onChange={(e) => {
            setSelectedUser({...selectedUser, zipCode: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Rolle Id</Form.Label>
          <Form.Control type="text" value={selectedUser.roleId} onChange={(e) => {
            setSelectedUser({...selectedUser, roleId: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Epost</Form.Label>
          <Form.Control type="text" value={selectedUser.email} onChange={(e) => {
            setSelectedUser({...selectedUser, email: e.target.value});
          }} />
        </Form.Group>

		<Form.Group>
          <Form.Label>Passord</Form.Label>
          <Form.Control type="password" value={selectedUser.password} onChange={(e) => {
            setSelectedUser({...selectedUser, password: e.target.value});
          }} />
        </Form.Group>
		<Form.Group>
          <Form.Label>Gjenta Passord</Form.Label>
          <Form.Control type="password" value={selectedUser.password} onChange={(e) => {
            setSelectedUser({...selectedUser, password: e.target.value});
          }} />
        </Form.Group>		

      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Lukk
      </Button>
      <Button variant="primary" onClick={() => {
        handleSave(selectedUser);
        setShowModal(false);
      }}>
        Lagre
      </Button>
    </Modal.Footer>
  </Modal>
)}

		</>
	);
}

export default AdminEditUser;
