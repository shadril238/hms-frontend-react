import Navbar from "../../components/navbar/Navbar";
import AdminDoctorDatatable from "../../components/patients/datatable/AdminDoctorDatatable";
import Datatable from "../../components/patients/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

const AdminDoctorList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <AdminDoctorDatatable />
      </div>
    </div>
  );
};

export default AdminDoctorList;
