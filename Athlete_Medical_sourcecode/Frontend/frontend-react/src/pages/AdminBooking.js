import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

  const AdminBooking = () => {
  const username = Cookies.get("username");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7209/api/User/specialists")
      .then((response) => {
        const filteredUsers = response.data.filter((user) => user.roleId === 2);
        setUsers(filteredUsers);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

    return (
        <>
            <HeaderAdmin/>
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <div><h2>Velkommen {username} </h2></div>
                <div>
                <Table striped bordered hover>
      <             thead>
                        <tr>
                            <th>Fornavn</th>
                            <th>Etternavn</th>
                        </tr>
                    </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        </tr>
        ))}
      </tbody>
    </Table>
                </div>             
        
      
       
            </div>     
        </>
    )  
}

export default AdminBooking;