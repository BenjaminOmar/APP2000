import React from 'react';
import './Footer.css';

const Footer = () => {
    return(
        <footer className='footer'>
            {/*Separator line above footerColumns */ }
            <hr className="separator1"/>

            {/*Footer columns*/ }
            <div className='footerColumns'>
                <div className='footerColumn'>
                    <h4>Kolonne 1</h4>
                    <ul>
                        <li> <a href="/column1Link1">Kolonne 1 Link 1</a></li>
                        <li><a href="/column1Link2">Kolonne 1 Link 2</a></li>
                        <li><a href="/column1Link3">Kolonne 1 Link 3</a></li>
                    </ul>
                </div>
                <div className="footerColumn">
                    <h4>Kolonne 2</h4>
                    <ul>
                        <li><a href="/column2Link1">Kolonne 2 Link 1</a></li>
                        <li><a href="/column2Link2">Kolonne 2 Link 2</a></li>
                        <li><a href="/column2Link3">Kolonne 2 Link 3</a></li>
                    </ul>                    
                </div>
                <div className="footerColumn">
                    <h4>Kolonne 3</h4>
                    <ul>
                    <li><a href="/column3Link1">Kolonne 3 Link 1</a></li>
                    <li><a href="/column3Link2">Kolonne 3 Link 2</a></li>
                    <li><a href="/column3Link3">Kolonne 3 Link 3</a></li>
                    </ul>
                </div>
            </div>
            {/*Separator line below footerColumns */ }
            <hr className="separator2"/>
                      
            {/*Footer image */ }
            <img src={process.env.PUBLIC_URL + '/images/footerImage.png'} alt='Footer' className='footerImage'/>

           
            {/*Footer links */ }
            <div className= "footerLinks">
                <a href="/terms">Vilkår</a>
                <a href="/privacy">Personvern</a>
                <a href="/Cookies">Informasjonskapsler</a>
            </div>

           
        </footer>
    );
}

export default Footer;