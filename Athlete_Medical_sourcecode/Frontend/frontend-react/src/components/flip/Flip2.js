//This is a React component that renders a video as the background of the home page of the web application.

//Imports the React library.
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";
// import "./Flip2.css";

//A function that returns a div container that contains the video and a text overlay.
function Flip2() {
	const [flip, setFlip] = useState(false);
	return (
		<ReactCardFlip isFlipped={flip} flipDirection="horizontal">
			<div className="background">
				<LoginForm />
				<button onClick={() => setFlip(!flip)}>Flip</button>
			</div>
			<div>
				<RegisterForm />
				<button onClick={() => setFlip(!flip)}>Flip</button>
			</div>
		</ReactCardFlip>
	);
}
//The component is exported as a default export.
export default Flip2;
