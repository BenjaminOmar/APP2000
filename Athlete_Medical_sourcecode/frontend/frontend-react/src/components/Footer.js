//This component creates the footer. 

//import packages from react-bootstrap, react-router-dom, footer Image and style sheet. 
import { Row, Col, Image } from 'react-bootstrap';
import footerImage from '../images/footerImage2.png';
import { Link } from 'react-router-dom';
import "./Footer.css";

//Create the footer component
const Footer = () =>{
  return (
    <footer className='bg-light text-center text-lg-start' >
      <div className='container p-4'>
        {/* Creates a row with four columns */}
        <Row>
          {/* First column is footer image and slogan */}
          <Col md='3' lg='4' xl='3' className='mx-auto mb-4'>
            <Link to= '/'>
              <Image src={footerImage} className="logoAnimation"  alt='Company Logo'/>
            </Link>  
            <br/>       
            <br/>
            <p> "Vår profesjonalitet er din trygghet".</p>
          </Col>
          {/* Second collumn is links to "våre behandlere" and "Tjenester" */}
          <Col md='2' lg='2' xl='2' className='mx-auto mb-4' >
            <br/>
            <p>
              <Link to="/specialistsection" className='text-reset'>
                Våre behandlere
              </Link>              
            </p>
            <p>
                <Link to="/services" className='text-reset'>
                    Tjenester
                </Link> 
            </p>          
          </Col>
          {/* Third column is links to "Vilkår og personvern" and "Konakt oss" */}
          <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
          <br/>
            <p>
                <Link to="/termsprivacy" className='text-reset'>
                    Vilkår og personvern
                </Link>  
            </p>
            <p>
                <Link to="/contact" className='text-reset'>
                    Kontakt oss
                </Link> 
            </p>           
          </Col>
          {/* Fourth column contains contact information */}
          <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
          <br/>
            <p>
              <i className='fas fa-home me-3'></i>
              Kongens gate 21A, 0153 Oslo
            </p>
            <p>
              <i className='fas fa-envelope me-3'></i>
              kontakt@athletemedical.no
            </p>
            <p>
              <i className='fas fa-phone me-3'></i>
              + 47 234 567 88
            </p>            
          </Col>
        </Row>
      </div>
      {/* At the bottom of the footer is a copyright mark with year and firm name */}
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Athlete Medical
      </div>
    </footer>
  );
}
export default Footer; 