import "./Card.css";
import RegisterForm from "./../RegisterForm";
import LoginForm from "./../LoginForm";

function Card({ onClick }) {
	return (
		<div className="card" onClick={onClick}>
			<div className="card-back">
				<RegisterForm />
			</div>
			<div className="card-front">
				<LoginForm />
			</div>
		</div>
	);
}

export default Card;
