var sidebar = document.getElementById("sidebar");
var popup = document.getElementById("popup");
var closeBtn = document.getElementById("closeBtn");
var subscribeBtn = document.getElementById("subscribeBtn");

popup.style.display = "none";

sidebar.addEventListener("click", function() {
popup.style.display = "block";
popup.classList.add("show");
});

closeBtn.addEventListener("click", function() {
popup.style.display = "none";
popup.classList.remove("show");
});

subscribeBtn.addEventListener("click", function() {
popup.style.display = "none";
popup.classList.remove("show");
});