import React from "react";
import SpecialisHeader from '../components/SpecialistDashboardComponents/SpecialistHeader';
import FindUsers from "../components/SpecialistDashboardComponents/FindUsers";
import WriteJournal from "../components/SpecialistDashboardComponents/WriteJournal";
import FindJournals from "../components/SpecialistDashboardComponents/FindJournals";
import TopBar from "../components/SpecialistDashboardComponents/TopBar";
import SideBar from "../components/SpecialistDashboardComponents/SideBar";




function SpecialistDashboard() {
  return (
		<>
			
			<TopBar/>
			<SideBar/>
			<FindUsers/>

			

		</>

    
	);

}

export default SpecialistDashboard;