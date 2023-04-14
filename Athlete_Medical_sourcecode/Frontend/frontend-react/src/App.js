/*This code defines a React component called App. 
The component contains a BrowserRouter component and a list of Route components 
that specify how each URL path should be matched to a React component to be displayed. 
The Footer component always appears at the bottom of the page. 
As the user navigates through the app, BrowserRouter will ensure that the correct React component is loaded and displayed.*/

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/HomePages/Home";
import Footer from "./components/Footer"; // legg til import for Footer-komponenten
import ForgotPwrdUser from "./components/UserDashboard/ForgotPwrdUser";
import TermsPrivacyPage from "./pages/HomePages/TermsPrivacyPage";
import Services from "./pages/HomePages/Services";
import Contact from "./pages/HomePages/Contact";
import SpecialistSection from "./pages/HomePages/SpecialistSection";
import AdminEditUser from "./pages/AdminDashboardPages/AdminEditUser";
import AdminBooking from "./pages/AdminDashboardPages/AdminBooking";
import AdminSeeJournal from "./pages/AdminDashboardPages/AdminSeeJournal";
import Flip from "./components/Home/flip";
import AlterUserAdmin from "./pages/AdminDashboardPages/AlterUserAdmin";
import AlterUserSpecialist from "./pages/SpecialistDashboardPages/AlterUserSpecialist";
import AlterUser from "./pages/UserDashboardPages/AlterUser";
import UserBooking from "./pages/UserDashboardPages/UserBooking";
import FindPasient from "./pages/SpecialistDashboardPages/FindPasient"
import FindAppointment from "./pages/SpecialistDashboardPages/FindAppointment"
import GetJournal from "./pages/SpecialistDashboardPages/GetJournal"
import MakeSchedule from "./pages/SpecialistDashboardPages/MakeSchedule"
import WriteJournal from "./pages/SpecialistDashboardPages/WriteJournal";
import FutureAppointments from "./pages/UserDashboardPages/FutureAppointment";
import UserJournal from "./pages/UserDashboardPages/UserJournal";


function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />			
					<Route path="/forgotpwrduser" element={<ForgotPwrdUser />} />
					<Route path="/termsprivacy" element={<TermsPrivacyPage />} />
					<Route path="/services" element={<Services />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/specialistsection" element={<SpecialistSection />} />
					<Route path="/adminedituser" element={<AdminEditUser />} />
					<Route path="/adminbooking" element={<AdminBooking />} />
					<Route path="/adminseejournal" element={<AdminSeeJournal />} />
					<Route path="/login" element={<Flip />} />
					<Route path="/alteruseradmin" element={<AlterUserAdmin />} />
					<Route path="/alteruserspecialist" element={<AlterUserSpecialist/>} />
					<Route path="/alteruser" element={<AlterUser/>} />
					<Route path="/FindPasient" element={<FindPasient/>}/>
					<Route path="/FindAppointment" element={<FindAppointment/>}/>
					<Route path="/MakeSchedule" element={<MakeSchedule/>}/>
					<Route path="/GetJournal" element={<GetJournal/>}/>
					<Route path="WriteJournal" element={<WriteJournal/>}/>
					<Route path="futureappointment" element={<FutureAppointments/>}/>
					<Route path="UserJournal" element={<UserJournal/>}/>
					<Route path="UserBooking" element={<UserBooking/>}/>
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
export default App;
