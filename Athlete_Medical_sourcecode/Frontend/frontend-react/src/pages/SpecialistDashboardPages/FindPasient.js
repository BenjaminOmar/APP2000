import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import { Button, Form, Table} from "react-bootstrap";
import HeaderSpec from "../../components/SpecialistDashboard/HeaderSpec";



function FindPasient() {
  // Define state variables using the useState hook
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
      const response = await axios.get("https://localhost:7209/api/user/patients"); // Send a GET request to the API to retrieve all users
      const data = response.data;// Extract the data from the response
      const filteredResults = response.data.filter(
        // Filter the data based on the search term
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the first name includes the search term (ignoring case)
          user.middleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the middle name (if it exists) includes the search term (ignoring case)
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||// Check if the last name includes the search term (ignoring case)
          user.socialSecurityNum.includes(searchTerm) &&// Check if the social security number includes the search term
          user.roleId === 1
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
      {/* Render the HeaderAdmin component */}
      <HeaderSpec />
      {/* Create a div with padding at the top and bottom and display a welcome message with the username */}
      <div style={{ paddingTop: '50px', paddingBottom: '30px', }}>
        <h2> Søk pasient </h2>
      </div>

      {/* Create a Form.Group component with margin on the left and right */}
      <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Create a Form.Control component with a text type, placeholder text, value, and onChange function */}
        <Form.Control
          style={{ width: '22%' }}
          type="text"
          placeholder="Søk på fornavn, etternavn eller personnummer"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {/* Create a Button component with a onClick function, margin on the left, width, and marginBottom */}
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
                {/* Create table headers */}
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
              {/* Loop through each user object in the searchResults array, showing 25 users at a time */}
              {searchResults.slice(startIndex, endIndex).map((user) => (
                // Render a table row for each user object, with a unique key based on its userId
                <tr key={user.userId}>
                  {/* Display the user's information in each table cell */}
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
          {/* Render a pagination component to allow the user to navigate between pages if there is more than 25 users in the table */}
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
    </div>
  );
}
//The component is exported as a default export
export default FindPasient;

