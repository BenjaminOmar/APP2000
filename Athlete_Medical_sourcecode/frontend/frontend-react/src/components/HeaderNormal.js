import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import picture from "../images/footerImage2.png";

function HeaderNormal() {
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

export default HeaderNormal;
