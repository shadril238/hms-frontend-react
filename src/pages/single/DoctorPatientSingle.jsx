import "./single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/DoctorSidebar";
import Profile from "../../components/patients/profilepage/Profile";

const DoctorPatientSingle = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Profile />
      </div>
    </div>
  );
};

export default DoctorPatientSingle;
