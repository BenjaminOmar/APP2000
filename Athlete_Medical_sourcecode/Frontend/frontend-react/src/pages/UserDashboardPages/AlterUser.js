/*The code is a component function for the user profile page. 
It imports necessary packages, including React Bootstrap for UI components, Axios for HTTP client requests, and Cookies for handling browser cookies. 
The component retrieves the username from a browser cookie and uses it to fetch user data. 
It displays the user data in a table and allows the user to edit their profile information. 
The component includes functions for handling form input changes, submitting form data, and validating zip codes using an API.

*/
// Importing necessary packages
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Card } from 'react-bootstrap';
import axios from 'axios';// HTTP client library for making API requests
import Cookies from "js-cookie";// JavaScript library for handling browser cookies
import HeaderUser from '../../components/UserDashboard/HeaderUser';// Component for the header of the page

// React component function for the user profile page
function AlterUser() {
    const username = Cookies.get("username");// Retrieving the username from the browser cookie
    const [searchResults, setSearchResults] = useState([]);// State variable for storing search result
    const [showEditModal, setShowEditModal] = useState(false); // State variable for showing/hiding the edit modal
    const [password, setPassword] = useState("");// State variable for storing the password input
    const [confirmPassword, setConfirmPassword] = useState("");// State variable for storing the confirm password input

    // Cleanup function to reset the confirm password input field when the component unmounts
    useEffect(() => {
        return () => {
            setConfirmPassword("");
        };
    }, []);

    // This function is called when the component is first rendered and whenever 'username' changes
    useEffect(() => {
        getUserValue();
    }, [username]);

    // Effect hook to reset the confirm password input field when the edit modal is closed
    useEffect(() => {
        if (!showEditModal) {
            setConfirmPassword("");
        }
    }, [showEditModal]);


    // This function updates the state of the confirmPassword variable 
    // with the value from the input field when it is changed.
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    // This function creates a state variable named editValues and initializes it with an object
    // containing properties for the user's first name, middle name, last name, phone number,
    // address, zip code, email, and password. These properties are initially empty strings.
    const [editValues, setEditValues] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phoneNumber: "",
        adress: "",
        zipCode: "",
        email: "",
        password: "",
    });

    // This function is called when the user clicks on the edit button.
    // It sets the state of the showEditModal variable to true, which shows the edit modal.
    // It also updates the editValues state variable with the values of the selected user.
    const handleEditClick = () => {
        setShowEditModal(true);
        setEditValues({
            firstName: searchResults[0].firstName,
            middleName: searchResults[0].middleName,
            lastName: searchResults[0].lastName,
            phoneNumber: searchResults[0].phoneNumber,
            adress: searchResults[0].adress,
            zipCode: searchResults[0].zipCode,
            email: searchResults[0].email,
            password: searchResults[0].password,
            userId: searchResults[0].userId,
            socialSecurityNum: searchResults[0].socialSecurityNum,
            roleId: searchResults[0].roleId,
            regDate: searchResults[0].regDate,
            username: searchResults[0].username
        });
    };

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

    // This function is called when there is a change in any input field in a form
    const handleChange = (event) => {
        // Extract the 'name' and 'value' properties from the event target object
        const { name, value } = event.target;
        // Update the 'editValues' state object by merging the previous state with the new 'name' and 'value'
        setEditValues(prevState => ({ ...prevState, [name]: value }));
        // If the changed field is the 'password' input, update the 'password' state
        if (name === "password") {
            setPassword(value);
            // If the changed field is the 'confirmPassword' input, update the 'confirmPassword' state
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    // Define a function called 'handleSubmit' that takes an 'event' object as an argument
    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Check if the first name input is empty
        if (!editValues.firstName) {
            // If it is, show an alert message and stop the function execution
            alert('Vennligst fyll ut fornavn');
            return;
        }

        // Check if the last name input is empty
        if (!editValues.lastName) {
            // If it is, show an alert message and stop the function execution
            alert('Vennligst fyll ut etternavn');
            return;
        }

        // Check if the phone number input is empty or doesn't match the Norwegian phone number format
        if (!editValues.phoneNumber || !/^[\d]{8}$/.test(editValues.phoneNumber)) {
            // If it doesn't, show an alert message and stop the function execution
            alert('Telefonnummeret må inneholde 8 sifre');
            return;
        }

        // Check if the address input is empty
        if (!editValues.adress) {
            // If it is, show an alert message and stop the function execution
            alert('Vennligst fyll ut adresse');
            return;
        }


        // Call a function called 'validateZipCode' with the 'editValues.zipCode' as an argument and wait for it to finish
        const isValidZipCode = await validateZipCode(editValues.zipCode);
        // Check if the zip code is valid
        if (!isValidZipCode) {
            // If it's not, show an alert message and stop the function execution
            alert("Ugyldig postnummer");
            return;
        }

        // Check if the email input is a valid email address
        if (!editValues.email.includes("@") || !editValues.email.includes(".")) {
            // If it's not, show an alert message and stop the function execution
            alert("Vennligst fyll inn en gyldig e-postadresse");
            return;
        }

        // Check if the password input contains at least one letter and one number, and has a minimum length of 8 characters
        if (!/[a-zA-ZæøåÆØÅ]/.test(editValues.password) || !/[0-9]/.test(editValues.password)) {
            // If it doesn't, show an alert message and stop the function execution
            alert("Passordet må inneholde mist 8 karakterer, inkludert minst en bokstav og ett nummer");
            return;
        }

        // Check if the password input contains the username input
        if (editValues.password.includes(editValues.username)) {
            // If it does, show an alert message and stop the function execution
            alert("Passordet kan ikke inneholde brukernavnet.");
            return;
        }

        // Check if the password and confirm password inputs match
        if (password.length > 0 && password !== confirmPassword) {
            // If they don't match, show an alert message and stop the function execution
            alert("Passordene du har skrevet inn er ikke like");
            return;
        }

        try {
            // Use the axios library to make a PUT request to the specified API endpoint with the specified editValues data.
            await axios.put("https://localhost:7209/api/user/update", editValues);
            // If the request is successful, show an alert message to inform the user that the save was successful.
            alert('Lagring vellykket!');
            // If an error occurs during the request, show an alert message to inform the user of the error. 
        } catch (error) {
            alert(error);
        }
        // Regardless of whether the request was successful or not, hide the edit modal.
        setShowEditModal(false);
        // After hiding the edit modal, update the user's value by calling the getUserValue function.
        getUserValue();
    };

    // Define an asynchronous function called getUserValue
    const getUserValue = async () => {
        try {
            // Send a GET request to the specified URL using axios library
            const response = await axios.get("https://localhost:7209/api/user/getAll");
            // Extract the data from the response object
            const data = response.data;
            // Filter the data to only include the information from the user with username retrieved for the browser cookie
            const filteredResults = data.filter((user) => user.username === username);
            // Update the search results with the filtered data
            setSearchResults(filteredResults);
        } catch (error) {
            // Display an alert if there was an error with the GET request
            alert(error);
        }
    };

    return (
        // A div to hold the entire component
        <div>
            {/* Header component for the admin section */}
            <HeaderUser />
            {/* A div with grid display and center alignment */}
            <div
                style={{
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                {/* A card component to display user information */}
                <Card style={{ marginTop: '5%', width: '60%' }}>
                    <Card.Header style={{ textAlign: "center" }} as="h5" >
                        {/* Displaying a welcome message with the username */}
                        <h4>Velkommen til dine sider {username}</h4>
                        {/* Information about the functions of the page to the user */}
                        <p>Nedenfor ser du informasjon om opplysningene som er lagret om deg som bruker.
                            Hvis du trykker på "Rediger" knappen får du mulighet til å endre informasjonen som er lagret om det.
                            Vær oppmerksom på at når eventuelle endringer er lagret, vil det ikke være mulig å reversere dette.
                        </p>
                    </Card.Header>
                    <Card.Body style={{ marginTop: '2%' }}>
                        {/* Conditional rendering to display search results */}
                        {searchResults.length > 0 ? ( //if there is at least one result of the search
                            <Table hover style={{ width: '70%', marginLeft: '12%', marginBottom: '100px' }}>
                                <tbody>
                                    {/* Mapping through the search results to create table rows with information from the database */}
                                    {searchResults.map((user) => (
                                        <>
                                            <tr>
                                                <td><b>Rolle ID:</b></td>
                                                <td>{user.roleId}</td>
                                            </tr>
                                            <tr key={user.userId}>
                                                <td><b>Brukernavn:</b></td>
                                                <td>{user.username}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Personnummer:</b></td>
                                                <td>{user.socialSecurityNum}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Fornavn:</b></td>
                                                <td>{user.firstName}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Mellomnavn:</b></td>
                                                <td>{user.middleName}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Etternavn:</b></td>
                                                <td>{user.lastName}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Telefonnummer:</b></td>
                                                <td>{user.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Adresse:</b></td>
                                                <td>{user.adress}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Postnummer:</b></td>
                                                <td>{user.zipCode}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Epost:</b></td>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    {/* A Button with the handleEditClick function, styled to fit the form */}
                                                    <Button
                                                        onClick={handleEditClick}
                                                        style={{
                                                            width: '60%',
                                                            marginLeft: '25%',
                                                            marginTop: '2%',
                                                            marginBottom: '2%'
                                                        }}>
                                                        Rediger
                                                    </Button>
                                                        {/* A Button that directs the user to the previous page*/}
                                                    <Button
                                                        style={{
                                                            width: '60%',
                                                            marginLeft: '25%',
                                                            marginTop: '2%',
                                                            marginBottom: '2%',
                                                            color: '#fff',
                                                            backgroundColor: 'blue',
                                                            border: 'none',
                                                            borderRadius: '5px',
                                                            padding: '10px',
                                                        }}
                                                        onClick={() =>window.history.back()}
                                                    >
                                                        Avbryt
                                                    </Button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Fant ingen resultater for {username}</p> //If there is no information it'll be messaged to the user. 
                        )}
                    </Card.Body>
                </Card>
                {/* A modal that gives the user the opportunity to edit information  */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>{/* A close button in the modal header */}
                        {/* Modal title*/}
                        <Modal.Title>Rediger informasjon</Modal.Title>
                    </Modal.Header>
                    {/* Modal Body with form groups containing forms with the different editable information */}
                    <Modal.Body>
                        <Form >
                            <Form.Group>
                                <Form.Label>Fornavn</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editValues.firstName}
                                    name="firstName"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mellomnavn</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="middleName"
                                    value={editValues.middleName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Etternavn</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={editValues.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Telefonnummer</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={editValues.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Adresse</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="adress"
                                    value={editValues.adress}
                                    onChange={handleChange}

                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Postkode</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="zipCode"
                                    value={editValues.zipCode}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Epost</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={editValues.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Passord</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={editValues.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bekreft Passord</Form.Label>
                                <Form.Control
                                    placeholder="Brukes kun ved registrering av nytt passord"
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* A cancel button in the modal footer which cancels editing and closes the modal */}
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Avbryt
                        </Button>
                        {/* A save button that calls the handleSubmit function*/}
                        <Button onClick={handleSubmit}>
                            Lagre endringer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};
//The component is exported as a default export
export default AlterUser; 