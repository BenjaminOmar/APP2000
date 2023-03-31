import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Table, Card, Alert } from "react-bootstrap";
import '../components/SeeAllJournals.css';
import AppointmentTest from "../components/AppointmentTest";
import BookingTest from "../components/BookingTest";

function AdminSeeAppointments() {
const username = Cookies.get("username");
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

const searchAppointments = async (event) => {
event.preventDefault();
try{
const response = await axios.get("https://localhost:7209/api/appointment/getAll");
const data = response.data;
const filteredResults = data.filter(
(appointment) =>
appointment.appointmentId.toString().includes(searchTerm) ||
new Date(appointment.startTime).toLocaleString().includes(searchTerm) ||
new Date(appointment.endTime).toLocaleString().includes(searchTerm) ||
appointment.roomId.toString().includes(searchTerm) ||
appointment.patientId.toString().includes(searchTerm) ||
appointment.specialistId.toString().includes(searchTerm)
);
setSearchResults(filteredResults);
} catch (error) {
Alert(error);
};
}

return (
  <>
    <div className="AllJournals">
      <div className="container d-flex justify-content-center">
        <div className="box">
          <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
            <h2>Søk etter avtale</h2>
          </div>
          <Card>
            <Card.Header style={{ textAlign: "center" }} as="h5">
              Søk i avtaler
            </Card.Header>
            <Card.Body>
              <Card.Text style={{ paddingRight: "12%", paddingLeft: "12%" }}>
                Her kan du søke etter en avtale ved å skrive inn en tekst i søkefeltet under. Søket vil returnere alle avtaler som inneholder den angitte teksten.
             Du kan finne en avtale ved å søke etter pasient ID, spesialist ID eller Rom ID.
              </Card.Text>
            </Card.Body>
          </Card>
          <Form.Group
            className="mb-3"
            style={{ marginLeft: "39%", marginRight: "40%" }}
          >
            <Form.Control
              type="text"
              placeholder="Søk etter en avtale"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={searchAppointments}
            style={{
              marginLeft: "40%",
              width: "19%",
              marginBottom: "50px",
            }}
          >
            Søk
          </Button>
          {searchResults.length > 0 && (
            <Table
              striped
              bordered
              hover
              style={{
                width: "70%",
                marginLeft: "12%",
                marginBottom: "100px",
              }}
            >
              <thead>
                <tr>
                  <th>Avtale ID</th>
                  <th>Starttidspunkt</th>
                  <th>Sluttidspunkt</th>
                  <th>Rom ID</th>
                  <th>Pasient ID</th>
                  <th>Spesialist ID</th>
                  <th>Er avtalen booket</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((appointment) => (
                  <tr key={appointment.appointmentId}>
                    <td>{appointment.appointmentId}</td>
                    <td>
                      {new Date(appointment.startTime).toLocaleString()}
                    </td>
                    <td>
                      {new Date(appointment.endTime).toLocaleString()}
                    </td>
                    <td>{appointment.roomId}</td>
                    <td>{appointment.patientId}</td>
                    <td>{appointment.specialistId}</td>
                    <td>{appointment.isAvailable ? "Nei" : "Ja"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  </>
);

}

export default AdminSeeAppointments;