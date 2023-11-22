import React from "react";
import "./appointmentSlotsPage.scss";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";
import AppointmentSlots from "../../components/doctor-appointment/appointmentSlots";

const AppointmentSlotsPage = () => {
  return (
    <div className="list">
      <DoctorSidebar />
      <div className="homeContainer">
        <Navbar />
        <AppointmentSlots />
      </div>
    </div>
  );
};

export default AppointmentSlotsPage;
