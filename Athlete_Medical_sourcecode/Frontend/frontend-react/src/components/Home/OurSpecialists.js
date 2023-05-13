// Importing neccessary components and files
import React from "react";
import "./OurSpecialists.css";
import { Link } from "react-router-dom";
import doctor1 from "../../images/doctor1.jpg";
import doctor2 from "../../images/doctor2.jpg";
import physician from "../../images/physician.jpg";
import physiotherapist from "../../images/physiotherapist.jpg";

// Defining the OurSpecialists function component
function OurSpecialists() {
	// Returning JSX code for the OurSpecialists component
	return (
		<div>
			<h2>Våre behandlere</h2>

			<div className="employee-section">
				{/* Rendering employee section */}

				<div className="employee">
					{/* Linking employee to specialist section using React Router */}
					<Link to="/specialistsection">
						<img src={doctor1} alt="Employee 1" />
						{/* Displaying information about the employee */}
						<div className="employee-text">
							<h3>Geir Arne Nilsen</h3>
							<p>Ortoped</p>
							Geir Arne Nilsen er en erfaren ortoped med spesialkompetanse innen
							behandling av bein- og leddskader og sykdommer. Han er grundig,
							oppmerksom og en verdifull tilføyelse til teamet vårt.{" "}
						</div>{" "}
					</Link>
				</div>

				<div className="employee">
					{/* Linking employee to specialist section using React Router */}
					<Link to="/specialistsection">
						<img src={doctor2} alt="Employee 2" />
						{/* Displaying information about the employee */}
						<div className="employee-text">
							<h3>Eva Johnsen</h3>
							<p>Sykepleier</p>
							Eva Johnsen er en sykepleier med omfattende erfaring med
							idrettsskader. Hun er dedikert til å hjelpe pasientene sine med å
							komme seg tilbake til idretten så raskt og trygt som mulig.{" "}
						</div>{" "}
					</Link>
				</div>

				<div className="employee" id="eva">
					{/* Linking employee to specialist section using React Router */}
					<Link to="/specialistsection">
						<img src={physician} alt="Employee 3" />
						{/* Displaying information about the employee */}
						<div className="employee-text">
							<h3>Karoline Ernstsen</h3>
							<p>Fysikalsk lege</p>
							Karoline Ernstsen er en erfaren fysikalsk lege med kompetanse
							innen rehabilitering av muskel- og skjelettplager. Hun er kjent
							for sin pasientfokuserte tilnærming og grundige vurderinger.
						</div>{" "}
					</Link>
				</div>

				<div className="employee">
					{/* Linking employee to specialist section using React Router */}
					<Link to="/specialistsection#behandlere">
						<img src={physiotherapist} alt="Employee 4" />
						{/* Displaying information about the employee */}
						<div className="employee-text">
							<h3>Hedda Vold</h3>
							<p>Fysioterapeut</p>
							Hedda Vold er en fysioterapeut med kompetanse innenfor muskel- og
							skjelettplager. Hun tilbyr helhetlig og personlig behandling og
							legger stor vekt på å lytte til pasientenes behov og ønsker.
						</div>{" "}
					</Link>
				</div>
			</div>
		</div>
	);
}

// Exporting OurSpecialist component as the default export
export default OurSpecialists;
