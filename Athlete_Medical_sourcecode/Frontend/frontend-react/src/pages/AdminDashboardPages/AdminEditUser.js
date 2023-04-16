/*This code defines a function, AdminEditUser, that enables an administrator to edit user information on an application using a user interface. 
The code imports various libraries such as React, axios and react-bootstrap to handle various functionalities in the interface, 
and also uses the Cookies library to store information about the username of the logged-in user. 
The function also includes logic to search for users and validate user data before it is stored in the database.
*/

// Import necessary components and libraries
import HeaderAdmin from "../../components/AdminDashboard/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Modal, Card } from "react-bootstrap";

// Define a function component called AdminEditUser
function AdminEditUser() {
  // Get the current username from cookies
  const username = Cookies.get("username");
  // Define state variables using the useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define a function to handle changes to the confirm password input field
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Define an asynchronous function to search for users
  const searchUsers = async (event) => {
    event.preventDefault();// Prevent the default form submission behavior
    try {
      const response = await axios.get("https://localhost:7209/api/user/getAll"); // Send a GET request to the API to retrieve all users
      const data = response.data;// Extract the data from the response
      const filteredResults = data.filter(
        // Filter the data based on the search term
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the first name includes the search term (ignoring case)
          user.middleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the middle name (if it exists) includes the search term (ignoring case)
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the last name includes the search term (ignoring case)
          user.socialSecurityNum.includes(searchTerm)// Check if the social security number includes the search term
      );
      setSearchResults(filteredResults);// Update the search results state variable with the filtered results
    } catch (error) {
      alert(error);// Display an error message if there was a problem with the API request
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

  // Define an async function to handle saving user data
  const handleSave = async () => {

    // Error handling begins here

    // Validate phone number - must contain only 8 numbers
    if (!/^[\d]{8}$/.test(selectedUser.phoneNumber)) {
      alert("Telefonnummeret må inneholde 8 sifre");
      return;
    }

    //Validate that the zip code is a valid zipCode in norway
    const isValidZipCode = await validateZipCode(selectedUser.zipCode);
    if (!isValidZipCode) {
      alert("Ugyldig postnummer");
      return;
    }

    // Ensure that the roleId is either 1, 2 or 3
    if (selectedUser.roleId.toString() !== "1" && selectedUser.roleId.toString() !== "2" && selectedUser.roleId.toString() !== "3") {
      alert("Kun 1, 2 og 3 er gyldige rolle nummer")
      return;
    }
    // Ensure that a valid email address is provided
    if (!selectedUser.email.includes("@") || !selectedUser.email.includes(".")) {
      alert("Vennligst fyll inn en gyldig e-postadresse");
      return;
    }

    // Ensure that the password meets the minimum requirements
    if (!/[a-zA-ZæøåÆØÅ]/.test(selectedUser.password) || !/[0-9]/.test(selectedUser.password)) {
      alert(
        "Passordet må inneholde mist 8 karakterer, inkludert minst en bokstav og ett nummer"
      );
      return;
    }

    // Ensure that the password does not contain the username
    if (selectedUser.password.includes(selectedUser.username.toString())) {
      alert("Passordet kan ikke inneholde brukernavnet.");
      return;
    }

    // Ensure that the password and confirm password fields match
    if (password.length > 0 && password !== confirmPassword) {
      alert("Passordene du har skrevet inn er ikke like");
      return;
    }

    // If all validations pass, create an object containing the updated user data
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

    // Define the URL to send the updated data to
    const url = "https://localhost:7209/api/user/update";

    // Send a PUT request to the server with the updated user data
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
      {/* Render the HeaderAdmin component */}
      <HeaderAdmin />
      {/* Create a div with padding at the top and bottom and display a welcome message with the username */}
      <div style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <h2>Velkommen {username} </h2>
      </div>
      {/* Create a Card component with a header and body */}
      <Card >
        <Card.Header style={{ textAlign: "center" }} as="h5">Redigere Brukerkontoer</Card.Header>
        <Card.Body>
          {/* Add text to the Card component with padding on the right and left */}
          <Card.Text style={{ paddingRight: '12%', paddingLeft: '12%' }} >
            Velkommen til Rediger Bruker-siden! Her kan du enkelt søke opp og redigere informasjonen til en spesifikk bruker av applikasjonen.
            Bruk søkefeltet til å finne brukeren du ønsker å redigere, og klikk deretter på "Rediger knappen" ved navnet deres for å få tilgang
            til informasjonen deres. Når du har valgt en bruker, kan du enkelt redigere deres personlige informasjon,
            som for eksempel navn, adresse, e-postadresse og telefonnummer. Endringene du gjør, vil umiddelbart lagres i datasystemet.
          </Card.Text>
        </Card.Body>
      </Card>
      {/* Create a Form.Group component with margin on the left and right */}
      <Form.Group className="mb-3" style={{ marginLeft: '39%', marginRight: '40%' }}>
        {/* Create a Form.Control component with a text type, placeholder text, value, and onChange function */}
        <Form.Control
          type="text"
          placeholder="Søk på fornavn, etternavn eller personnummer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {/* Create a Button component with a onClick function, margin on the left, width, and marginBottom */}
      <Button onClick={searchUsers} style={{ marginLeft: "40%", width: "19%", marginBottom: "50px" }}>Search</Button>

      {searchResults.length > 0 && (
        // Render a table only if there are search results
        <Table
          //Style the table with striped rows, bordered cells and hover effects
          striped bordered hover
          // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
          style={{ width: '70%', marginLeft: '12%', marginBottom: '100px' }}
        >
          <thead>
            <tr>
              {/* Create table headers */}
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
            {/* Loop through each user object in the searchResults array */}
            {searchResults.map((user) => (
              // Render a table row for each user object, with a unique key based on its userId
              <tr key={user.userId}>
                <td>
                  {/* Render a button to edit the user's information, which opens a modal */}
                  <Button onClick={() => {
                    setSelectedUser(user);
                    setShowModal(true);
                  }}>Rediger
                  </Button>
                </td>
                {/* Display the user's information in each table cell */}
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

      {/* This is a conditional rendering statement, showing the Modal only if "selectedUser" is truthy */}
      {selectedUser && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton> {/*CloseButton to close the modal  */}
            <Modal.Title>Rediger bruker</Modal.Title> {/*Modal header*/}
          </Modal.Header>
          <Modal.Body> {/*Modal Body */}
            {/* This form contains input fields for the information from the selected user with the value taken from the "selectedUser.'value'" property */}
            {/* The "onChange" event handler updates the "selectedUser" object by creating a new object with the spread operator and the updated property value */}
            <Form>
              <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"//Specifies that the input should be a text field
                  value={selectedUser.userId}
                  disabled // Disables the input field so that it cannot be edited
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fornavn</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.firstName}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, firstName: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mellomnavn</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.middleName}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, middleName: e.target.value }); }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Etternavn</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.lastName}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, lastName: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Telefonnummer</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.phoneNumber}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, phoneNumber: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.adress}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, adress: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Postkode</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.zipCode}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, zipCode: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Rolle Id</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.roleId}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, roleId: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Epost</Form.Label>
                <Form.Control
                  type="text"// Specifies that the input should be a text field
                  value={selectedUser.email}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, email: e.target.value }); }}
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"// Specifies that the input should be a password field
                  value={selectedUser.password}
                  onChange={(e) => { setSelectedUser({ ...selectedUser, password: e.target.value }); setPassword(e.target.value) }}// Sets the component's state for password to the new password value
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bekreft Passord</Form.Label>
                <Form.Control
                  placeholder="Brukes kun ved registrering av nytt passord"// This sets the placeholder text inside the input field
                  type="password" // Specifies that the input should be a password field
                  value={confirmPassword}  // This sets the value of the input field to the state variable confirmPassword
                  onChange={handleConfirmPasswordChange} // This sets the function handleConfirmPasswordChange to be called whenever the input field value changes
                  required// This sets the input field as required, meaning the user must fill it out before submitting the form
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>{/*renders a footer within a modal dialog. */}
            <Button /*renders a clickable button element */
              style={{ width: '60%', marginRight: '21%' }}// This sets the width and right margin of the button element using inline styles.
              variant="primary" // This sets the color variant of the button to "primary", which is a predefined style in "react-bootstrap".
              onClick={() => { handleSave(selectedUser); }}> {/* This adds an event handler to the button that calls the "handleSave" function and passes the "selectedUser" object as an argument when the button is clicked. */}
              Lagre
            </Button>
          </Modal.Footer>
          <Modal.Footer> {/*renders a footer within a modal dialog. */}
            <Button /*renders a clickable button element */
              style={{ width: '60%', marginRight: '21%' }}// This sets the width and right margin of the button element using inline styles.
              variant="primary"// This sets the color variant of the button to "primary", which is a predefined style in "react-bootstrap".
              onClick={() => setShowModal(false)} >{/* This adds an event handler to the button that sets the "showModal" state to "false" when the button is clicked. */}
              Avbryt {/* Label text that will be displayed on the button. */}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
//The component is exported as a default export
export default AdminEditUser;
