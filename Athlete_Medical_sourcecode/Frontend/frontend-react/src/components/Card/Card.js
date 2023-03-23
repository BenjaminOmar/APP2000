import "./Card.css";
import RegisterForm from "./../RegisterForm";
import LoginForm from "./../LoginForm";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({ onClick }) {
	return (
		<div className="card">
			<div className="card-back" style={{ zIndex: 2 }}>
				<RegisterForm />
				<Link className="flip-button-back" onClick={onClick}>
					Til login
				</Link>
			</div>
			<div className="card-front" style={{ zIndex: 1 }}>
				<LoginForm />
				<Link className="flip-button-front" onClick={onClick}>
					Har du ikke bruker? Klikk her!
				</Link>
			</div>
		</div>
	);
}

export default Card;
