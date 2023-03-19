import DashboardForm from "../components/DashboardForm";
import HeaderNormal from "../components/HeaderNormal";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Appointment from "../components/Appointment";


const Dashboard = () => {

    <>
        <HeaderNormal/>
        <Appointment/>
        <DashboardForm/>
        
    </>
}

export default Dashboard; 

