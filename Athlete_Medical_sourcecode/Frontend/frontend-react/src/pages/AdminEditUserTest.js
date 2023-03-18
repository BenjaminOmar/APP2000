import HeaderAdmin from "../components/HeaderAdmin";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchBar from "../components/AdminEditUser/SearchBar";
import UserTable from "../components/AdminEditUser/UserTable";
import UserForm from "../components/AdminEditUser/UserForm";

const AdminEditUser = () => {
    
    const username = Cookies.get("username");
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = async (updatedUser) => {
    // Send updated user data to .net core API
    await axios.put(`/api/users/${updatedUser.id}`, updatedUser);
    // Refresh user data from API
    const response = await axios.get('/api/users');
    setUsers(response.data);
    // Deselect user
    setSelectedUser(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchData();
  }, []);

  let filteredUsers = users;
  if (searchTerm) {
    filteredUsers = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.socialSecurityNumber.includes(searchTerm)
    );
  }
    return (
        <>
            <HeaderAdmin/>
            <div style={{marginTop: '50px', marginBottom: '50px'}}>
                <div><h2>Velkommen {username} </h2></div>
                <div>
                   <h2>Redigere brukere:</h2>
                </div>             
                <div>
                    <SearchBar handleSearch={handleSearch} />
                    <UserTable users={filteredUsers} handleSelectUser={handleSelectUser} />
                        {selectedUser && (
                        <UserForm user={selectedUser}
                        handleUpdateUser={handleUpdateUser}
                        />
                      )}
                </div>
       
            </div>
      
     
        
        </>     

        )
    
}

export default AdminEditUser; 

