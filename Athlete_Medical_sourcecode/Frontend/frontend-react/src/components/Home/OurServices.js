// Import necessary modules from react and react-bootstrap libraries
import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// Import CSS file for styling
import './OurServices.css';
// Import Link component from react-router-dom library
import { Link } from 'react-router-dom';

// Define the OurServices component as a functional component
function OurServices() {
  // Render the following JSX code
  return (
    // Use a Fragment to group the child elements
    <>
      <Container fluid style={{ paddingTop: '50px' }}>
        {/* Render the heading for the section */}
        <h2>Våre tjenester</h2><br />
        <Row className="justify-content-md-center">
          {/* Render the first service card */}
          <Card border="dark" style={{ width: '18rem' }}>
            <Card.Header> <h5>Ortopedi</h5> </Card.Header>
            <Card.Body>
              <Card.Text>
                 {/* Describe the services offered by the orthopedic team */}
                Våre ortopeder tilbyr tjenester knyttet til behandling og forebygging av
                idrettsskader som påvirker bein, ledd og muskler. Dette kan inkludere
                diagonstosering, behandling og rehabilitering av skader som for
                eksempel brudd, forstuinger, senebetennelser og leddgikt. Ortopeden
                kan også tilby kirurgiske inngrep når det er nødvendig.
              </Card.Text>  <br />
              {/* Add a link to read more about the orthopedic services */}
              <Link to="/services">Les mer her...</Link>
            </Card.Body>
          </Card>
          {/* Render the second service card */}
          <Card border="dark" style={{ width: '18rem' }}>
            <Card.Header><h5>Fyskialsk lege</h5></Card.Header>
            <Card.Body>
              <Card.Text>
                 {/* Describe the services offered by the physical medicine team */}
                Fysikalsk lege har en rekke tjenester på vår klinikk. Disse er rettet mot å
                forebygge og behandle idrettsrelaterte skader og plager. Det inkluderer
                undersøkelser og diagnostikk av skader, individuell tilpasset rehabilitering,
                smertebehandling og treningsterapi for å optimalisere atletisk ytelse og
                redusere risikoen for fremtidige skader.
              </Card.Text>  <br />
              {/* Add a link to read more about the physical medicine services */}
              <Link to="/services">Les mer her...</Link>
            </Card.Body>
          </Card>
          {/* Render the third service card */}
          <Card border="dark" style={{ width: '18rem' }}>
            <Card.Header><h5>Fysioterapi</h5></Card.Header>
            <Card.Body>
              <Card.Text>
                 {/* Describe the services offered by the physiotherapy team */}
                Fysopterapautene våre tilbyr undersøkelser og behandling av muskel- og skjelettplager, rehabilitering
                etter skader, opptrening etter operasjoner og forebyggende tiltak for å
                unngå skader. Behandlingene kan inkludere øvelser, manuell terapi, tøyninger,
                og rådgivning om livsstilsendringer og ergonomi.
              </Card.Text>  <br /><br />
              {/* Add a link to read more about the physiotherapy services */}
              <Link to="/services">Les mer her...</Link>
            </Card.Body>
          </Card>
          {/* Render the fourth service card */}
          <Card border="dark" style={{ width: '18rem' }}>
            <Card.Header><h5>Sykepleie</h5></Card.Header>
            <Card.Body>
              <Card.Text>
                {/* Describe the services offered by the nurse team */}
                Våre sykepleiere tilbyr en rekke tjenester som inkluderer undersøkelse av pasienter,
                å ta og analysere prøver, administrasjon av medisiner, behandling av
                skader og sår, veiledning om ernæring og livsstil, og assistanse
                under medisinske prosedyrer. Sykepleierne kan også gi råd og veiledning om
                forebyggende helse og sikkerhet for idrettsutøvere.
              </Card.Text>
              {/* Add a link to read more about the nurse services */}
              <Link to="/services">Les mer her...</Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
}

//The component is exported as a default export.
export default OurServices;