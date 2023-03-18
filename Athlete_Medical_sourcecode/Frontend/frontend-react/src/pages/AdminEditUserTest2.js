//Importing AdminHeader component
import HeaderAdmin from "../components/HeaderAdmin";
// Importing React and hooks
import React, { useState, useEffect } from "react";
// Importing React Bootstrap components
import { Form, Button, Card, Table } from "react-bootstrap";
// Importing Axios for making API requests
import axios from 'axios';
// Importing Js-cookie for handling cookies
import Cookies from "js-cookie";


//Create a function that handles the admin edit user function
const AdminEditUser = (event) => {
  //prevents the form from being sent in the normal way
  event.preventDefault();
    //retrieving the username cookie
    const username = Cookies.get("username");
    // Initializing the search term-, users-, filtered users-, and the selected user state
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
  // Initializing the form data state
    const [formData, setFormData] = useState({ 
        firstName: "",
        lastName: "",
        socialSecurityNumber: "",
    });

    
    useEffect(() => {
      //Define asynchronus function to fetch users from the API
      const fetchUsers = async() => {
        try{
          //use axios to make a GET request to the API endpoint with the search term as a query parameter 
        const response = await axios.get(
          `https://localhost:7209/api/user/getAll?search=${searchTerm}`
        );
        //Set the state variable 'users' to the response data. 
        setUsers(response.data);
        } catch (error){
          alert(error);
        }        
      };
      // call the fetchUsers function to fetch users when the component mounts or when 
      // the 'searchTerm' dependency changes. 
      fetchUsers();
    }, [searchTerm]);

    //a useEffect hook who is used to manage side effects in the functional component. 
    useEffect(() => {
      // Filter the users based on the search term
      const filteredResults = users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.socialSecurityNumber.includes(searchTerm)
      );
       // Set the filtered users as the new state
      setFilteredUsers(filteredResults);
    }, [searchTerm, users]);

    //This function updates the search term based on the input value
  const handleSearch =  (event) => {
    setSearchTerm(event.target.value);
  };
  //This function selects the user and sets the form data to match their details. 
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName, 
      socialSecurityNumber: user.socialSecurityNumber,
    });
  };

  //Function to handle form input changes
  const handleChange = (event) => {
    //Use the spread operator to copy existing form data, and update the field with new value
    setFormData({
      ...formData,
      [event.target.name]:event.target.value,
    });
  };

    //This function updates a user's information by making a PUT request to the API with the updateUser object. 
    //If the request is successful, the selected user is set to null and the form data is reset.
    //If there is an error, it is given as an alert.  
  const handleUpdateUser = async (updatedUser) => {
    try {
      await axios.put(
        `https://localhost:7209/api/user/update/${selectedUser.id}`,
        updatedUser
      );
      setSelectedUser(null);
      setFormData({
        firstName: "",
        lastName: "",
        socialSecurityNumber: "",
      });
    } catch (error) {
      alert(error);
    }
  };

    return (
       <>
         <Form
          style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          }}>
          <Card style={{ padding: "2%" }}>
            <Form.Group className="mb-3">
              <Form.Label>
                <p>
                  Skriv inn fornavn, etternavn eller fødselsnummer for å søke etter
                  bruker
                </p>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Søk etter bruker"
                value={searchTerm}
                onChange={handleSearch}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Søk
            </Button>
          </Card>
        </Form>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fornavn</th>
            <th>Etternavn</th>
            <th>Fødselsnummer</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} onClick={() => handleSelectUser(user)}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.socialSecurityNumber}</td>
            </tr>
          ))}
        </tbody>
        </Table>
        <Form onSubmit={handleUpdateUser}>
          <Form.Group controlId="firstName">
            <Form.Label>Fornavn</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Etternavn</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="socialSecurityNumber">
            <Form.Label>Fødselsnummer</Form.Label>
            <Form.Control
              type="text"
              name="socialSecurityNumber"
              value={formData.socialSecurityNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Lagre
          </Button>
        </Form>       
       </> 
    )     
}

export default AdminEditUser; 

