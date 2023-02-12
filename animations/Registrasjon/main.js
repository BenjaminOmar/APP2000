var loginButton = document.getElementById("linkLogginn");
var registerButton = document.getElementById("linkLagBrukerKonto");

loginButton.onclick = function(){
	document.querySelector("#flipper").classList.toggle("flip");
}

registerButton.onclick = function(){
	document.querySelector("#flipper").classList.toggle("flip");
}