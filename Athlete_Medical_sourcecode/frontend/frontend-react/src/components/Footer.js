import './Footer.css';
import { Link } from 'react-router-dom';




export function Footer()  {
    return(
        <footer className='footer'>
            {/*Separator line above footerColumns */ }
            <hr className="separator1"/>

            {/*Footer columns*/ }
            <div className='footerColumns'>
                <div className='footerColumn'>
                    <h4>Kolonne 1</h4>
                    <ul>
                        <li> <Link to="/column1Link1">Kolonne 1 Link 1</Link></li>
                        <li><Link to="/column1Link2">Kolonne 1 Link 2</Link></li>
                        <li><Link to="/column1Link3">Kolonne 1 Link 3</Link></li>
                    </ul>
                </div>
                <div className="footerColumn">
                    <h4>Kolonne 2</h4>
                    <ul>
                        <li><Link to="/column2Link1">Kolonne 2 Link 1</Link></li>
                        <li><Link to="/column2Link2">Kolonne 2 Link 2</Link></li>
                        <li><Link to="/column2Link3">Kolonne 2 Link 3</Link></li>
                    </ul>                    
                </div>
                <div className="footerColumn">
                    <h4>Kolonne 3</h4>
                    <ul>
                    <li><Link to="/column3Link1">Kolonne 3 Link 1</Link></li>
                    <li><Link to="/column3Link2">Kolonne 3 Link 2</Link></li>
                    <li><Link to="/column3Link3">Kolonne 3 Link 3</Link></li>
                    </ul>
                </div>
            </div>
            {/*Separator line below footerColumns */ }
            <hr className="separator2"/>
                      
            {/*Footer image */ }
            <Link to="/">
                <img src={process.env.PUBLIC_URL + '/images/footerImage.png'} alt='Footer' className='footerImage'/>
            </Link>
            

           
            {/*Footer links */ }
            <div className= "footerLinks">
                <Link to="/terms">Vilkår</Link>
                <Link to="/privacy">Personvern</Link>
                <Link to="/Cookies">Informasjonskapsler</Link>
            </div>

           
        </footer>
    );
}

export default Footer;