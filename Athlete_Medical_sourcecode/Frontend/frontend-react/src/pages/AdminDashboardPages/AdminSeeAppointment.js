// Importing necessary modules
import HeaderAdmin from "../../components/AdminDashboard/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Card, Alert } from "react-bootstrap";


// Component for searching and displaying appointments
function AdminSeeAppointments() {
const username = Cookies.get("username"); // Get the username from the cookie
const [searchTerm, setSearchTerm] = useState(""); // Set the state for the search term and the search results
const [searchResults, setSearchResults] = useState([]);

// Function for searching appointments
const searchAppointments = async (event) => {
event.preventDefault();
try{
// Make a GET request to the API to get all appointments
const response = await axios.get("https://localhost:7209/api/appointment/getAll");
const data = response.data; // Get the data from the response
// Filter the results based on the search term
const filteredResults = data.filter(
(appointment) =>
appointment.appointmentId.toString().includes(searchTerm) ||
new Date(appointment.startTime).toLocaleString().includes(searchTerm) ||
new Date(appointment.endTime).toLocaleString().includes(searchTerm) ||
appointment.roomId.toString().includes(searchTerm) ||
appointment.patientId.toString().includes(searchTerm) ||
appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
appointment.specialistId.toString().includes(searchTerm) 
);

setSearchResults(filteredResults);
} catch (error) {
Alert(error); // Display an alert if there is an error
};
}

// Return the JSX to render the component
return (
    <div style={{ minHeight: 'calc(100vh - 350px)', marginBottom: '70px'}}>
       <HeaderAdmin />
      {/* Create a div with padding at the top and bottom and display søk "etter avtale" */}
      <div style={{ paddingTop: '50px', paddingBottom: '30px', }}>
        <h2>Søk etter avtaler</h2>
      </div>
            {/* Create a Form.Group component with margin on the left and right */}
      <Form.Group className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Create a Form.Control component with a text type, placeholder text, value, and onChange function */}
        <Form.Control
          style={{ width: '22%' }}
          type="text"
          placeholder="Søk på navn, romId eller spesialistId"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {/* Create a Button component with a onClick function, margin on the left, width, and marginBottom */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={searchAppointments} style={{ width: '15%', marginBottom: '70px' }}>Søk</Button>
      </div>
  
          
      {searchResults.length > 0 && (
        // Render a table only if there are search results
        <div style={{marginBottom: '70px'}}>
          <Table className="mx-auto"
            //Style the table with striped rows, bordered cells and hover effects
            striped bordered hover
            // Set the table's width to 70% of its container and give it a left margin of 12% and a bottom margin of 100px
            style={{ width: '70%', marginBottom: '70px' }} >
              <thead>
                <tr>
                  <th>Avtale ID</th>
                  <th>Starttidspunkt</th>
                  <th>Sluttidspunkt</th>
                  <th>Rom ID</th>
                  <th>Pasient ID</th>
                  <th>Navn på pasient</th>
                  <th>Spesialist ID</th>
                  <th>Er avtalen booket</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((appointment) => ( // Loop through the search results and create a row for each appointment
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>
                      {new Date(appointment.startTime).toLocaleString()} {/*Convert the start time to a readable format*/} 
                    </td>
                    <td>
                      {new Date(appointment.endTime).toLocaleString()} {/*Convert the end time to a readable format*/}
                    </td>
                    <td>{appointment.roomId}</td>
                    <td>{appointment.patientId}</td>
                    <td>{appointment.name}</td>
                    <td>{appointment.specialistId}</td>
                    <td>{appointment.isAvailable ? "Nei" : "Ja"}</td> {/*Display "Ja" if the appointment is available, "Nei" otherwise*/}
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
          )}
      
  </div>
);

}

export default AdminSeeAppointments;