import React from "react";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";
import DoctorBookedAppointments from "../../components/doctor-appointment/doctorBookedAppointments";

const AppointmentBooked = () => {
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
          <DoctorBookedAppointments />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooked;
