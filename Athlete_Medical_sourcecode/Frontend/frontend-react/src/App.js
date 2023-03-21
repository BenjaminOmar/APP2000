import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer"; // legg til import for Footer-komponenten
import Dashboard from "./pages/Dashboard";
import ForgotPwrdUser from "./components/ForgotPwrdUser";
import TermsPrivacyPage from "./pages/TermsPrivacyPage";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SpecialistSection from "./pages/SpecialistSection";
import AdminEditUser from "./pages/AdminEditUser";
import AdminBooking from "./pages/AdminBooking";
import AdminSeeJournal from "./pages/AdminSeeJournal";
// import Flip from "./components/Flip";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/forgotpwrduser" element={<ForgotPwrdUser />} />
					<Route path="/termsprivacy" element={<TermsPrivacyPage />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/specialistsection" element={<SpecialistSection />} />
					<Route path="/adminedituser" element={<AdminEditUser />} />
					<Route path="/adminbooking" element={<AdminBooking />} />
					<Route path="/adminseejornal" element={<AdminSeeJournal />} />
					{/* <Route path="/flip" element={<Flip />} /> */}
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
export default App;
