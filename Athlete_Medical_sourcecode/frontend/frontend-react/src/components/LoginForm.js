//to do:
// - endre avstand knapper
// - lage om error meldingen til en onclick
// - sjekke coocies

import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Card} from 'react-bootstrap';

//Define the login component
const LoginForm = () =>{
    //Get the history object from the react-router-dom package
    const history = useNavigate();
    //Define the state variables for the login forms inputs and error message
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    
    // Handle the form submission
    const handleLoginSubmit = (event) => {
        event.preventDefault(); //Prevent the default form submit action
    }
    

    //Send a POST request to the ASP.NET Core API with the login credentials
    fetch("/api/login", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password}),
    })
        .then ((response) => {
            if(!response.ok){
                //If the response is not ok, set the error message to display to the user
                throw new Error("Ugyldig brukernavn eller passord");
            }
            return response.json();
        })
        .then((data) =>{
            //If the response is successful, navigate to the user page
            console.log(data);
            history.push('/userDashboard');
        })

        .catch((error) => {
            //Handle any errors that occur during the request or response
            setErrorMessage(error.message);
        });
    



return (
    <div className="d-flex justify-content-center align-items-start min-vh-100" style={{paddingTop: '50px', position:'relative'}}>
        {/*A Card component from bootstrap-react that is used to display the Login form.*/}
        <Card style={{ width: "400px",marginBottom: "50px" }}>
        <Card.Header>
            <h3>Logg Inn</h3> {/* A heading for the Login form */}
        </Card.Header>
        <Card.Body>
            {/* A Form component from bootstrap-react that is used to display a form for logging in */}
            <Form onSubmit={handleLoginSubmit}>
            {/* Display the error message, if any */}
            {errorMessage && <div>{errorMessage}</div>}
            {/* A Form.Group component that contains a Label and a Form.Control for the username */}
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Username:</Form.Label>
                {/* A Form.Control component that allows the user to input their username */}
                <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                />
            </Form.Group>
  
            {/* A Form.Group component that contains a Label and a Form.Control for the password */}
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                {/* A Form.Control component that allows the user to input their password */}
                <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                />
            </Form.Group>
  
            {/* A Button component that submits the form */}
            <Button variant="primary" type="submit">
                Logg Inn
            </Button>
            {/* A Link component that takes the user to the forgot password page */}
            <Link to="/forgot-password">Forgot Password</Link>
            </Form>
        </Card.Body>
        </Card>
        </div>
  );
}
  export default LoginForm;