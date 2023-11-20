import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">HMS</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">Patients</p>
          <li>
            <PersonAddAltIcon className="icon" />
            <span>Patient</span>
          </li>
          <p className="title">Doctors</p>
          <li>
            <PersonAddIcon className="icon" />
            <span>Doctor</span>
          </li>
          <p className="title">Pharmacy</p>
          <li>
            <MedicalServicesIcon className="icon" />
            <span>Pharmaceutical Inventory</span>
          </li>
          <p className="title">Notifications</p>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <p className="title">Profile</p>
          <li>
            <AccountCircleIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  );
};

export default Sidebar;
