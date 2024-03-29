//This is a React component that renders a video as the background of the home page of the web application.

//Imports the React library.
import React from 'react';
//Imports the video file to be used as the background
import video from '../../images/pexels-cottonbro-5310858.mp4';
//imports the CSS file for this component
import './HomeImage.css';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


//A function that returns a div container that contains the video and a text overlay.
function HomeImage(){
    return(
        <div className='homeImageContainer'>
            {/* The video is inserted using the HTML5 video tag, with the src attribute set to the imported video file, 
            and the autoPlay, loop, and muted attributes set to play the video automatically, 
            loop it, and mute the sound, respectively. */}
            <video src={video} autoPlay loop muted className="homeImage" />
            {/* The homeImageOverlay div contains the text that overlays the video */}
            <div className='homeImageOverlay'>
                <h3 className='homeImageHeader' style={{textShadow:'white 1px 0 3px' }} >Velkommen til vår medisinske sportsklinikk.</h3>
                <br/> <br/>  
                <p className='homeImageText' style={{textShadow:'white 1px 0 5px' }}>
                "Her finner du informasjon om våre behandlinger og vårt dyktige team av ansatte. 
                Som registrert bruker kan du enkelt booke avtaler online og se din medisinske historie fra klinikken. 
                Vi er her for å hjelpe deg å nå dine sportsrelaterte mål, enten du er en profesjonell utøver eller en mosjonist. 
                La oss hjelpe deg å prestere på ditt beste!"
                <br/> <br/>   
                "Vår profesjonalitet er din trygghet"                  
                </p>
                <br/> <br/>
                <Nav className="buttonRegister" style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}
>
						<Link to="/login">
							{" "}
							<button className="registerButton" style={{}}>Registrer deg</button>{" "}
						</Link>
					</Nav>
            </div>
        </div>
    )
}
//The component is exported as a default export.
export default HomeImage;
