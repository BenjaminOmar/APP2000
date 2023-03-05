import React from "react";
import './OurSpecialists.css';
import { Link } from "react-router-dom";
import doctor1 from '../images/doctor1.jpg';
import doctor2 from '../images/doctor2.jpg';
import physician from '../images/physician.jpg';
import physiotherapist from '../images/physiotherapist.jpg';


function OurSpecialists() {
  return (

<div>
  <h2>Våre spesialister</h2>

    <div className="employee-section">

      <div className="employee">
        <Link to="/">
        <img src={doctor1} alt="Employee 1"/> 
        <div className="employee-text">
        <h3>Geir Arne Nilsen</h3>
    <p>Ortoped</p>
    Quisque ipsum tortor, sagittis et viverra ac, sagittis at felis consequat turpis vel. </div> </Link>
      </div>
      

      <div className="employee">
      <Link to="/">
        <img src={doctor2} alt="Employee 2" />
        <div className="employee-text">
          Vivamus vitae felis ullamcorper, consequat turpis vel, maximus neque. Quisque ipsum tortor, sagittis et viverra ac, sagittis at felis. Suspendisse eu lacinia magna.</div> </Link>
      </div>

      <div className="employee">
      <Link to="/">
        <img src={physician} alt="Employee 3" />
        <div className="employee-text">Aenean enim felis, elementum sed consequat quis, accumsan sed lacus. Sed rhoncus mauris ultrices diam euismod maximus. Quisque lorem lorem, eleifend eu neque eget, ultrices accumsan augue.</div> </Link>
      </div>

      <div className="employee">
      <Link to="/">
        <img src={physiotherapist} alt="Employee 4" />
        <div className="employee-text">Duis metus lacus, consectetur quis auctor at, vehicula et risus. Donec elit augue, pretium in odio in, auctor vestibulum ex. Aliquam erat volutpat. Proin at semper purus, eu suscipit arcu.</div> </Link>
      </div>
    </div>
    </div>
  );
}
export default OurSpecialists;