//This is a React component that renders a video as the background of the home page of the web application.

//Imports the React library.
import React, { useState } from "react";
import "./flip.css";
import Card from "../Card/Card";
import { CSSTransition } from "react-transition-group";
import HeaderNormal from "./HeaderNormal";

//A function that returns a div container that contains the video and a text overlay.
function Flip() {
	const [showFront, setShowFront] = useState(true);

	return (
		<>
			<HeaderNormal></HeaderNormal>
			<div className="background">
				<div className="flippable-card-container">
					<CSSTransition in={showFront} timeout={300} classNames="flip">
						<Card setShowFront={setShowFront} />
					</CSSTransition>
				</div>
			</div>
		</>
	);
}
//The component is exported as a default export.
export default Flip;
