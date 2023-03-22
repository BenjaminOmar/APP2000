import "./Card.css";
import RegisterForm from "./../RegisterForm";
import LoginForm from "./../LoginForm";
import React, { useState } from "react";

function Card({ onClick }) {
	const [show, setShow] = useState(true);
	return (
		<div className="card">
			<div className="card-back">
				<RegisterForm />
				<a className="flip-button-back" href="#" onClick={onClick}>
					Til login
				</a>
			</div>
			<div className="card-front">
				{show ? <LoginForm /> : null}
				<a
					className="flip-button-front"
					href="#"
					onClick={(onClick, () => setShow(false))}>
					Har du ikke bruker? Klikk her!
				</a>
			</div>
		</div>
	);
}

export default Card;
