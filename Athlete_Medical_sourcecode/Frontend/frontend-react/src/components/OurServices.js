// Import necessary modules from react and react-bootstrap libraries
import React from 'react'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
// Import CSS file for styling
import './OurServices.css';
// Import Link component from react-router-dom library
import { Link } from 'react-router-dom';

// Define a functional component named OurServices
function OurServices () {
  // Render the following elements
  return (
     // Use a Fragment to group the child elements
    <>
      <Container fluid style={{paddingTop: '50px'}}>
        <h2>Våre tjenester</h2><br/>
        <Row className="justify-content-md-center">
          <Card border="dark"style={{ width: '18rem'}}>
              <Card.Header> <h5>Ortopedi</h5> </Card.Header>
              <Card.Body>
                <Card.Text>
                  Våre ortopeder tilbyr tjenester knyttet til behandling og forebygging av 
                  idrettsskader som påvirker bein, ledd og muskler. Dette kan inkludere 
                  diagonstosering, behandling og rehabilitering av skader som for 
                  eksempel brudd, forstuinger, senebetennelser og leddgikt. Ortopeden 
                  kan også tilby kirurgiske inngrep når det er nødvendig.  
                </Card.Text>  <br/>
                <Link to="/services">Les mer her...</Link>
              </Card.Body>
          </Card>
          <Card border="dark" style={{ width: '18rem' }}>
            <Card.Header><h5>Fyskialsk lege</h5></Card.Header>
            <Card.Body>
              <Card.Text>
                Fysikalsk lege har en rekke tjenester på vår klinikk. Disse er rettet mot å 
                forebygge og behandle idrettsrelaterte skader og plager. Det inkluderer 
                undersøkelser og diagnostikk av skader, individuell tilpasset rehabilitering, 
                smertebehandling og treningsterapi for å optimalisere atletisk ytelse og 
                redusere risikoen for fremtidige skader. 
              </Card.Text>  <br/>
            <Link to="/services">Les mer her...</Link>
            </Card.Body>
          </Card>
          <Card border="dark" style={{ width: '18rem' }}>
          <Card.Header><h5>Fysioterapi</h5></Card.Header>
              <Card.Body>        
                <Card.Text>
                  Fysopterapautene våre tilbyr undersøkelser og behandling av muskel- og skjelettplager, rehabilitering 
                  etter skader, opptrening etter operasjoner og forebyggende tiltak for å 
                  unngå skader. Behandlingene kan inkludere øvelser, manuell terapi, tøyninger, 
                  og rådgivning om livsstilsendringer og ergonomi. 
                </Card.Text>  <br/><br/>
              <Link to="/services">Les mer her...</Link>
              </Card.Body>
            </Card>
            <Card border="dark" style={{ width: '18rem' }}>
              <Card.Header><h5>Sykepleie</h5></Card.Header>
              <Card.Body>        
                <Card.Text>
                  Våre sykepleiere tilbyr en rekke tjenester som inkluderer undersøkelse av pasienter, 
                  å ta og analysere prøver, administrasjon av medisiner, behandling av 
                  skader og sår, veiledning om ernæring og livsstil, og assistanse 
                  under medisinske prosedyrer. Sykepleierne kan også gi råd og veiledning om 
                  forebyggende helse og sikkerhet for idrettsutøvere.
                </Card.Text>  
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