import DashboardForm from "../components/DashboardForm";
import HeaderNormal from "../components/HeaderNormal";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AppointmentBooking from "./AppointmentBooking";


const Dashboard = () => {

    <>
        <HeaderNormal/>
        <DashboardForm/>
        <AppointmentBooking/>
        
    </>
}

export default Dashboard; 

