import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";
import AppointmentPatientBooked from "../../components/doctor-appointment/appointmentPatientBooked";
import Sidebar from "../../components/sidebar/Sidebar";
const AppointmentPatientBookedPage = () => {
  return (
    <div className="flex min-h-screen">
      <div className="w-56">
        {" "}
        <Sidebar />
      </div>

      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          {" "}
          <AppointmentPatientBooked />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPatientBookedPage;
