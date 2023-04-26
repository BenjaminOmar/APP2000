/*import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { Button, Form, Table, Modal } from "react-bootstrap";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";
import styles from "./FindPasient02.module.css";



function FindPasient02() {
    // Define state variables using the useState hook
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [infoMessage, setInfoMessage] = useState('');
    const [showInfoModal, setShowInfoModal] = useState(false);
  
  
    // Set the initial current table page to 1
    const [currentPage, setCurrentPage] = useState(1);
    // Define the number of table items to display per page
    const pageSize = 25;
    // Calculate the index of the first item to display on the current page
    const startIndex = (currentPage - 1) * pageSize;
    // Calculate the index of the last item to display on the current page
    const endIndex = startIndex + pageSize;
  
  
  
  
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
  
    
     
  
     
    // Define a function to handle page changes
    const handlePageChange = (pageNumber) => {
      // Update the current page to the selected page number
      setCurrentPage(pageNumber);
    }
  
  
    return (
      <div style={{ minHeight: 'calc(100vh - 275px)' }}>
        
        <HeaderSpec />
        
        <div style={{ paddingTop: '50px', paddingBottom: '30px', }}>
          <h2> Søk pasient </h2>
        </div>
  
       
        <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
         
          <Form.Control
            style={{ width: '22%' }}
            type="text"
            placeholder="Søk på fornavn, etternavn eller personnummer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={searchUsers} style={{ width: '15%', marginBottom: '30px' }}>Search</Button>
        </div>
  
        {searchResults.length > 0 && (
          // Render a table only if there are search results
          <div>
            <Table className="mx-auto"
              //Style the table with striped rows, bordered cells and hover effects
              striped bordered hover
              // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
              style={{ width: '70%', marginBottom: '70px' }}
            >
              <thead>
                <tr>
                 
                  <th>Brukernavn</th>
                  <th>Fornavn</th>
                  <th>Mellomnavn</th>
                  <th>Etternavn</th>
                  <th>Telefonnummer</th>
                  <th>Addresse</th>
                  <th>Postkode</th>
                  <th>Epost</th>
                </tr>
              </thead>
              <tbody>
               
                {searchResults.slice(startIndex, endIndex).map((user) => (
                  // Render a table row for each user object, with a unique key based on its userId
                  <tr key={user.userId}>
                   
                    <td>{user.username}</td>

                    <td>{user.firstName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.adress}</td>
                    <td>{user.zipCode}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <Pagination
              size="sm"
              className="justify-content-center" // Center the pagination component horizontally
              activePage={currentPage} // Set the active page to the current page
              itemsCountPerPage={pageSize} // Set the number of items per page to the page size constant
              totalItemsCount={searchResults.length}// Set the total number of items in the search results array as the total items count
              onChange={handlePageChange} // Call the handlePageChange function when the active page is changed
            />
          </div>
        )}
  
        
    );
  }
  //The component is exported as a default export
  export default FindPasient02;
  */

   