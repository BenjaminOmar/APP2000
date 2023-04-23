// Importing neccessary components and files 
import React from "react";
import './OurServices.css';
import { Link } from "react-router-dom";
import doctor1 from '../../images/ortoped.png';
import doctor2 from '../../images/nurse.png';
import physician from '../../images/fysikalskLege.png';
import physiotherapist from '../../images/fysio.png';

// Defining the OurSpecialists function component
function OurServices() {

// Returning JSX code for the OurSpecialists component
return (
<div>
<h2>Våre tjenester</h2>

    <div className="services-section">
    {/* Rendering employee section */}

      <div className="employee">
        {/* Linking employee to specialist section using React Router */}
        <Link to="/services">
        <img src={doctor1} alt="Employee 1"/> 
        {/* Displaying information about the employee */}
        <div className="employee-text">
        <h3>Ortopedi</h3>
       
     Våre ortopeder tilbyr tjenester knyttet til behandling og forebygging av
                idrettsskader som påvirker bein, ledd og muskler. Dette kan inkludere
                diagnostisering, behandling og rehabilitering av skader. </div> </Link>
      </div>
      
      <div className="employee">
      {/* Linking employee to specialist section using React Router */}
      <Link to="/services">
        <img src={doctor2} alt="Employee 2" />
        {/* Displaying information about the employee */}
        <div className="employee-text">
        <h3>Sykepleie</h3>
        Våre sykepleiere tilbyr tjenester som inkluderer undersøkelse av pasienter,
                å ta og analysere prøver, administrasjon av medisiner, behandling av
                skader og sår, veiledning om ernæring og livsstil, og assistanse
                under medisinske prosedyrer. </div> </Link>
      </div>

      <div className="employee">
      {/* Linking employee to specialist section using React Router */}
      <Link to="/services">
        <img src={physician} alt="Employee 3" />
        {/* Displaying information about the employee */}
        <div className="employee-text">
        <h3>Fysikalsk medisin</h3>
        Fysikalsk medisin er rettet mot å
                forebygge og behandle idrettsrelaterte skader og plager. Det inkluderer
                undersøkelser og diagnostikk av skader, tilpasset rehabilitering,
                smertebehandling og treningsterapi.</div> </Link>
      </div>

      <div className="employee">
      {/* Linking employee to specialist section using React Router */}
      <Link to="/services">
        <img src={physiotherapist} alt="Employee 4" />
        {/* Displaying information about the employee */}
        <div className="employee-text">
        <h3>Fysioterapi</h3>
        Fysopterapautene våre tilbyr undersøkelser og behandling av muskel- og skjelettplager, rehabilitering
                etter skader, opptrening etter operasjoner og forebyggende tiltak for å
                unngå skader. Vi har rådgiving om livsstilsendringer og ergonomi.</div> </Link>
      </div>
    </div>
    </div>
  );
}

// Exporting OurSpecialist component as the default export
export default OurServices;