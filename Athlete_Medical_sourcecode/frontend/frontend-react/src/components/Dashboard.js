import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";

const Dashboard = () => {
  // Define the state variables for the user and role
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  // Get the current URL location from the react-router-dom package
  const location = useLocation();

  // Add a useEffect hook to get the user and role from cookies
  useEffect(() => {
    const roleCookie = Cookies.get("role");
    const usernameCookie = Cookies.get("username");

    // If there is no cookie with the user's role and username, navigate back to the login page
    if (!roleCookie || !usernameCookie) {
      window.location.href = "/login";
    } else {
      setRole(roleCookie);
      setUser(usernameCookie);
    }
  }, [location]);

  // Handle the logout button click event
  const handleLogout = () => {
    // Remove the cookies with the user's role and username
    Cookies.remove("role");
    Cookies.remove("username");

    // Navigate the user back to the login page
    window.location.href = "/login";
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div>
        <h2>Velkommen, {user}</h2>
        <p>Du har tilgang til følgende funksjoner:</p>
        {role === "1" && (
          <ul>
            <li>Book time</li>
            <li>Se bestilte timer</li>
          </ul>
        )}
        {role === "2" && (
          <ul>
            <li>Se alle avtaler</li>
            <li>Opprette en ny avtale</li>
            <li>Skriv notat</li>
          </ul>
        )}
        {role === "3" && (
          <ul>
            <li>Endre bruker rolle</li>
            <li>Se alle brukere</li>
            <li>Slette bruker</li>
          </ul>
        )}
        <Button variant="primary" onClick={handleLogout}>
          Logg ut
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
