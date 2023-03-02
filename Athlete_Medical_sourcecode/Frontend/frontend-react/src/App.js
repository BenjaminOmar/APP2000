import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer"; // legg til import for Footer-komponenten
import Dashboard from "./pages/Dashboard";
import DashboardForm from "./components/DashboardForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboardForm" element={<DashboardForm />} />
					<Route path="/admindashboard" element={<AdminDashboard />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</>
	);
}
export default App;
