import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

function LoginAndRegister() {
    // State for å holde på verdiene til skjemaene
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [ssn, setSsn] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");


  // State for å holde på om vi skal vise innloggingsskjemaet eller registreringsskjemaet
  const [showLogin, setShowLogin] = useState(true);

  // Metode som håndterer innloggingsskjemaets submit-event
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("Innloggingsskjema sendt inn!", { username, password });
  };

  //Metode som håndterer glemt passord submit-event
  const handleForgottenPsw = (event) =>{
    event.preventDefault();
    console.log("")
  }

  // Metode som håndterer registreringsskjemaets submit-event
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    console.log("Registreringsskjema sendt inn!", {
      username,
      firstName,
      middleName,
      lastName,
      phone,
      ssn,
      address,
      zip,
      city,
      password1,
      password2,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-start vh-100" style={{paddingTop: '50px', position:'relative'}}>
      <Card style={{ width: "400px",marginBottom: "50px" }}>
        <Card.Header className="text-center">
          {showLogin ? "Logg Inn" : "Registrer Her"}
        </Card.Header>
        <Card.Body>
          {showLogin ? (
            <Form onSubmit={handleLoginSubmit} >
              <Form.Group>
                <Form.Label>Brukernavn</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Passord</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" block style={{backgroundColor:'#0050B1', marginTop: '20px'}}>
                Logg Inn
              </Button>
              <Form.Text className="text-muted"style={{paddingLeft:'10px'}}>
                Har du ikke bruker?{" "}
                <a href="#" style={{paddingLeft : '10px',}} onClick={() => setShowLogin(false)}>
                  Registrer deg her
                </a>
              </Form.Text>
            </Form>
          ) : (
            <Form onSubmit={handleRegisterSubmit} >
              <Form.Group>
                <Form.Label>Brukernavn *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fornavn *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mellomnavn</Form.Label>
                <Form.Control
                  type="text"
                  value={middleName}
                  onChange={(event) => setMiddleName(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Etternavn *</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Skriv inn etternavn" 
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Telefonnummer *</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Personnummer *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={ssn}
                  onChange={(event) => setSsn(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Adresse *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Postkode *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={zip}
                  onChange={(event) => setZip(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Poststed *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Passord *</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gjenta passord *</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                />
              </Form.Group>
                <Button type="submit" variant="primary" block style={{backgroundColor:'#0050B1', marginTop: '20px'}}>
                    Registrer
                </Button>
                <Form.Text className="text-muted" style={{paddingLeft : '10px',}}>
                    Har du allerede bruker?{" "}
                    <a href="#" onClick={() => setShowLogin(true)} style={{paddingLeft : '10px',}}>
                        Logg Inn
                    </a>
                </Form.Text>
              <Form.Group>
                <Form.Text className="d-flex justify-content-center">
                   <a href="#">Glemt passord?</a> 
                </Form.Text>
              
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginAndRegister;


