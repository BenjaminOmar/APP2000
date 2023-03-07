import { Row, Col, Image } from 'react-bootstrap';
import footerImage from '../images/footerImage2.png';
import { Link } from 'react-router-dom';

const Footer = () =>{
  return (
    <footer className='bg-light text-center text-lg-start' >
      <div className='container p-4'>
        <Row>
          <Col md='3' lg='4' xl='3' className='mx-auto mb-4'>
            <Link to= '/'>
              <Image src={footerImage}  alt='Company Logo'/>
            </Link>         
            <p> "Vår profesjonalitet er din trygghet".</p>
          </Col>
          <Col md='2' lg='2' xl='2' className='mx-auto mb-4' >
            {/* <h6 className='text-uppercase fw-bold mb-4'>Overskrift</h6> */}
            <br/>
            <p>
              <Link to="/" className='text-reset'>
                Våre behandlere
              </Link>              
            </p>
            <p>
                <Link to="/services" className='text-reset'>
                    Tjenester
                </Link> 
            </p>          
          </Col>
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

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Athlete Medical
      </div>
    </footer>
  );
}
export default Footer; 