import React from "react";
import Sidebar from "../../components/sidebar/PatientSidebar";
import Navbar from "../../components/navbar/Navbar";
import DoctorProfile from "../../components/patients/profilepage/patientDoctorProfile";

const PatientDoctorProfileWithAppointment = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <DoctorProfile />
      </div>
    </div>
  );
};

export default PatientDoctorProfileWithAppointment;
