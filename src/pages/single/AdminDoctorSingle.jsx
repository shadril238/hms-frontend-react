import "./single.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Profile from "../../components/patients/profilepage/Profile";
import AdminDoctorProfile from "../../components/patients/profilepage/adminDoctorProfile";

const AdminDoctorSingle = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <AdminDoctorProfile />
      </div>
    </div>
  );
};

export default AdminDoctorSingle;
