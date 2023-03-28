/*This code imports the React and ReactDOM libraries and an App component, and then uses them to render the App component within a 
root element in the HTML document. It also imports Bootstrap CSS and JS files to style the app. 
The use of React.StrictMode enables additional checks and warnings during development to help improve code quality.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min"; // Bootstrap Bundle JS

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
