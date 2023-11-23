import React from "react";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";
import DoctorAppointment from "../../components/doctor-appointment/doctorAppointment";

const AppointmentCreate = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-56">
        {" "}
        <DoctorSidebar />
      </div>

      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          {" "}
          <DoctorAppointment />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCreate;
