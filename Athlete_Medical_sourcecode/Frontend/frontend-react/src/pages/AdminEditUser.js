//Kommentere koden. 


import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Modal, Card } from "react-bootstrap";

function AdminEditUser() {
  const username = Cookies.get("username");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const searchUsers = async (event) => {
    event.preventDefault();
    try {
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

  // A function that validates the zipcode making a request to the Zippopotamus.us API
  async function validateZipCode(zipCode) {
    try {
      //Construct the API url using the zip code.
      const url = `https://api.zippopotam.us/no/${zipCode}`;
      //making a get request to the API an wait for response
      const response = await axios.get(url);
      //check if the response status is 200(OK) and return the result
      return response.status === 200;
    } catch (error) {
      //Return false if validation fails
      return false;
    }
  }


  const handleSave = async () => {

    //Error handling
    //Validate phone number
    if (!/^\d+$/.test(selectedUser.phoneNumber)) {
      alert("Telefonnummeret kan bare inneholde tall");
      return;
    }

    //Validate that the zip code is a valid zipCode in norway
    const isValidZipCode = await validateZipCode(selectedUser.zipCode);
    if (!isValidZipCode) {
      alert("Ugyldig postnummer");
      return;
    }

    if (selectedUser.roleId.toString() !== "1" && selectedUser.roleId.toString() !== "2" && selectedUser.roleId.toString() !== "3") {
      alert("Kun 1, 2 og 3 er gyldige rolle nummer")
      return;
    }

    if (!selectedUser.email.includes("@") || !selectedUser.email.includes(".")) {
      alert("Vennligst fyll inn en gyldig e-postadresse");
      return;
    }

    if (!/[a-zA-ZæøåÆØÅ]/.test(selectedUser.password) || !/[0-9]/.test(selectedUser.password)) {
      alert(
        "Passordet må inneholde mist 8 karakterer, inkludert minst en bokstav og ett nummer"
      );
      return;
    }
    if (selectedUser.password.includes(selectedUser.username.toString())) {
      alert("Passordet kan ikke inneholde brukernavnet.");
      return;
    }
    if (password.length > 0 && password !== confirmPassword) {
      alert("Passordene du har skrevet inn er ikke like");
      return;
    }

    const data = {
      userId: selectedUser.userId,
      firstName: selectedUser.firstName,
      MiddleName: selectedUser.middleName,
      LastName: selectedUser.lastName,
      PhoneNumber: selectedUser.phoneNumber,
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
        alert('Lagring vellykket! Trykk "Avslutt" for å gå ut av skjemaet.');
      })
      .catch((error) => {
        alert(error);
      });
  };



  return (
    <>
      <HeaderAdmin />
      <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <h2>Velkommen {username} </h2>
      </div>
      <Card >
        <Card.Header style={{ textAlign: "center" }} as="h5">Redigere Brukerkontoer</Card.Header>
        <Card.Body>
          <Card.Text style={{ paddingRight: '12%', paddingLeft: '12%' }} >
            Velkommen til Rediger Bruker-siden! Her kan du enkelt søke opp og redigere informasjonen til en spesifikk bruker av applikasjonen.
            Bruk søkefeltet til å finne brukeren du ønsker å redigere, og klikk deretter på "Rediger knappen" ved navnet deres for å få tilgang
            til informasjonen deres. Når du har valgt en bruker, kan du enkelt redigere deres personlige informasjon,
            som for eksempel navn, adresse, e-postadresse og telefonnummer. Endringene du gjør, vil umiddelbart lagres i datasystemet.
          </Card.Text>
        </Card.Body>
      </Card>
      <Form.Group className="mb-3" style={{ marginLeft: '39%', marginRight: '40%' }}>
        <Form.Control
          type="text"
          placeholder="Søk på fornavn, etternavn eller personnummer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Button onClick={searchUsers} style={{ marginLeft: "40%", width: "19%", marginBottom: "50px" }}>Search</Button>

      {searchResults.length > 0 && (
        <Table striped bordered hover style={{ width: '70%', marginLeft: '12%', marginBottom: '100px' }}>
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
                <Form.Control
                  type="text"
                  value={selectedUser.userId}
                  disabled
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fornavn</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.firstName}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, firstName: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mellomnavn</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.middleName}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, middleName: e.target.value }); }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Etternavn</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.lastName}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, lastName: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Telefonnummer</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.phoneNumber}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, phoneNumber: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.adress}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, adress: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Postkode</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.zipCode}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, zipCode: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rolle Id</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.roleId}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, roleId: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Epost</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.email}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, email: e.target.value }); }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"
                  value={selectedUser.password}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, password: e.target.value }); setPassword(e.target.value) }}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bekreft Passord</Form.Label>
                <Form.Control
                  placeholder="Brukes kun ved registrering av nytt passord"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ width: '60%', marginRight: '21%' }}
              variant="primary"
              onClick={() => { handleSave(selectedUser); }}>
              Lagre
            </Button>
          </Modal.Footer>
          <Modal.Footer>
            <Button
              style={{ width: '60%', marginRight: '21%' }}
              variant="primary"
              onClick={() => setShowModal(false)} >
              Avslutt
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default AdminEditUser;
