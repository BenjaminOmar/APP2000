import "./Card.css";
import RegisterForm from "./../RegisterForm";
import LoginForm from "./../LoginForm";
import React, { useState } from "react";

function Card({ onClick }) {
	return (
		<div className="card">
			<div className="card-back" style={{ zIndex: 2 }}>
				<RegisterForm />
				<a className="flip-button-back" href="#" onClick={onClick}>
					Til login
				</a>
			</div>
			<div className="card-front" style={{ zIndex: 1 }}>
				<LoginForm />
				<a className="flip-button-front" href="#" onClick={onClick}>
					Har du ikke bruker? Klikk her!
				</a>
			</div>
		</div>
	);
}

export default Card;
