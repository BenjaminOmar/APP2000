// Importing necessary components from React Bootstrap and other files
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../Header.css";
import { Link, NavLink } from "react-router-dom";
import picture from "../../images/footerImage2.png";


// Defining the HeaderNormal function component
function HeaderNormal() {
	// Returning JSX code for the header
	return (
		<Navbar className="navbar" expand="lg">
			<Container>
				<Navbar.Brand href="/" className="brand">
					<img src={picture} alt="Logo" className={"logoAnimationHeader"} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<NavLink to="/" className="list-item" activeClassName="active">
							Hjem
						</NavLink>
						<NavLink
							to="/services"
							className="list-item"
							activeClassName="active">
							Tjenester
						</NavLink>
						<NavLink
							to="/specialistsection"
							className="list-item"
							activeClassName="active">
							Våre behandlere
						</NavLink>
						<NavLink
							to="/contact"
							className="list-item"
							activeClassName="active">
							Kontakt oss
						</NavLink>
					</Nav>

					<Nav className="ms-auto">
						<Link to="/login">
							{" "}
							<button className="loginButton">Logg inn</button>{" "}
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

// Exporting the HeaderNormal component as the default export of this module
export default HeaderNormal;
