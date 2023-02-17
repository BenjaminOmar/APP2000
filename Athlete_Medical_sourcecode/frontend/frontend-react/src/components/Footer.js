import React from 'react';
import './Footer.css';

const Footer = () => {
    return(
        <footer className='footer'>
            {/*Footer image */ }
            <img src={ProcessingInstruction.env.PUBLIC-URL + '/footerImage.png'} alt='Footer' className='footerImage'/>
            
            {/*Footer links */ }
            <div className= "footerLinks">
                <a href="/terms">Vilkår</a>
                <a href="/privacy">Personvern</a>
                <a href="/Cookies">Informasjonskapsler</a>
            </div>

            {/*Separator line */ }
            <hr/>

            {/*Footer columns*/ }
            <div className='footerColumns'>
                <div className='footerColumn'>
                    <h4>Kolonne 1</h4>
                    <a href="/column1Link1">Kolonne 1 Link 1</a>
                    <a href="/column1Link2">Kolonne 1 Link 2</a>
                </div>
                <div className="footerColumn">
                    <h4>Column 2</h4>
                    <a href="/column2Link1">Kolonne 2 Link 1</a>
                    <a href="/column2Link2">Kolonne 2 Link 2</a>
                </div>
                <div className="footerColumn">
                    <h4>Column 3</h4>
                    <a href="/column3-link1">Kolonne 3 Link 1</a>
                    <a href="/column3-link2">Kolonne 3 Link 2</a>
                </div>
            </div>

            {/* Separator line */}
            <hr />
        </footer>
    );
}

export default Footer;