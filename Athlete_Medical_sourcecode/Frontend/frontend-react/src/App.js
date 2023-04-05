/*This code defines a React component called App. 
The component contains a BrowserRouter component and a list of Route components 
that specify how each URL path should be matched to a React component to be displayed. 
The Footer component always appears at the bottom of the page. 
As the user navigates through the app, BrowserRouter will ensure that the correct React component is loaded and displayed.*/

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
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
import Flip from "./components/flip";
import AlterUser from "./pages/AlterUser";
import Booking from "./pages/Booking";
import FindPasient from "./pages/SpecialistDashboardPages/FindPasient"
import FindAppointment from "./pages/SpecialistDashboardPages/FindAppointment"
import GetJournal from "./pages/SpecialistDashboardPages/GetJournal"
import MakeSchedule from "./pages/SpecialistDashboardPages/MakeSchedule"
import WriteJournal from "./pages/SpecialistDashboardPages/WriteJournal";


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/forgotpwrduser" element={<ForgotPwrdUser />} />
					<Route path="/termsprivacy" element={<TermsPrivacyPage />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/specialistsection" element={<SpecialistSection />} />
					<Route path="/adminedituser" element={<AdminEditUser />} />
					<Route path="/adminbooking" element={<AdminBooking />} />
					<Route path="/adminseejournal" element={<AdminSeeJournal />} />
					<Route path="/login" element={<Flip />} />
					<Route path="/alteruser" element={<AlterUser />} />
					<Route path="/FindPasient" element={<FindPasient/>}/>
					<Route path="/FindAppointment" element={<FindAppointment/>}/>
					<Route path="/MakeSchedule" element={<MakeSchedule/>}/>
					<Route path="/GetJournal" element={<GetJournal/>}/>
					<Route path="WriteJournal" element={<WriteJournal/>}/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
export default App;
