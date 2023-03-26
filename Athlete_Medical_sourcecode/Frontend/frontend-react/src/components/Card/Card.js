import "./Card.css";
import RegisterForm from "./../RegisterForm";
import LoginForm from "./../LoginForm";
import React from "react";
import { Link } from "react-router-dom";


function Card({ setShowFront }) {
	const setShowFrontProp = (value) => {
		setShowFront(value);
	};

	return (
		<> 
		<div className="card">			
			<div className="card-back" style={{ zIndex: 2 }}>
			<RegisterForm setShowFrontProp={setShowFrontProp} />
			</div>
			<div className="card-front" style={{ zIndex: 1 }}>
				<LoginForm />
				<Link className="flip-button-front" onClick={() => setShowFront(false)}>
					Har du ikke bruker? Klikk her!
				</Link>
			</div>
		</div>
		</>
	);
}

export default Card;
