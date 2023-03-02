import { Container, Row, Col, Image } from 'react-bootstrap';
import footerImage from '../images/footerImage2.png';
import { Link } from 'react-router-dom';

const Footer = () =>{
  return (
    <footer className='bg-light text-center text-lg-start'>
      <div className='container p-4'>
        <Row>
          <Col md='3' lg='4' xl='3' className='mx-auto mb-4'>
          <Image src={footerImage} alt='Company Logo'/>
            <p>
            
              "Vår profesjonalitet er din trygghet.<br/> 
              Ta kontakt for en uforpliktene konsultasjon". 
            </p>
          </Col>

          <Col md='2' lg='2' xl='2' className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Overskrift</h6>
            <p>
                <Link to="/" className='text-reset'>
                    Lenke?
                </Link>              
            </p>
            <p>
                <Link to="/" className='text-reset'>
                    Lenke?
                </Link> 
            </p>
            <p>
                <Link to="/" className='text-reset'>
                    Lenke?
                </Link>  
            </p>
            
          </Col>

          <Col md='3' lg='2' xl='2' className='mx-auto mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Nyttige Lenker</h6>
            <p>
                <Link to="/" className='text-reset'>
                    Vilkår
                </Link>  
            </p>
            <p>
                <Link to="/" className='text-reset'>
                    Personvern
                </Link> 
            </p>
            <p>
                <Link to="/" className='text-reset'>
                    Informasjonskapsler
                </Link> 
            </p>
            <p>
              
            </p>
          </Col>

          <Col md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
            <h6 className='text-uppercase fw-bold mb-4'>Kontakt oss</h6>
            <p>
              <i className='fas fa-home me-3'></i>
              Kongens gate 21a, 0153 Oslo
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