import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [patientSubmenuOpen, setPatientSubmenuOpen] = useState(false);
  const [doctorSubmenuOpen, setDoctorSubmenuOpen] = useState(false);
  const [pharmacySubmenuOpen, setPharmacySubmenuOpen] = useState(false);
  const [notificationSubmenuOpen, setNotificationSubmenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-56 h-screen border-r border-gray-200 bg-white">
      <div className="flex items-center justify-center h-12">
        <span className="text-xl font-bold text-purple-600">HMS</span>
      </div>
      <hr />
      <div className="flex-grow overflow-auto">
        <ul className="p-2">
          {/* Main Options */}
          <li className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer mb-2">
            <DashboardIcon className="text-white" />
            <Link to="/" className="ml-4 text-base font-semibold text-white">
              Dashboard
            </Link>
          </li>
          {/* Patient Section */}
          <li className="mb-2">
            <div
              className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer"
              onClick={() => setPatientSubmenuOpen(!patientSubmenuOpen)}
            >
              <PersonAddAltIcon className="text-white" />
              <span className="flex-grow ml-4 text-base font-semibold text-white">
                Patients
              </span>
              {patientSubmenuOpen ? (
                <ExpandLessIcon className="text-white" />
              ) : (
                <ExpandMoreIcon className="text-white" />
              )}
            </div>
            {patientSubmenuOpen && (
              <ul className="mt-0">
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link to="/admin/patient/list" className="text-black">
                    Patient List
                  </Link>
                </li>
                {/* Additional submenu items can be added here */}
              </ul>
            )}
          </li>
          {/* ... Dashboard, Patients ... */}
          {/* Doctor Section */}
          <li className="mb-2">
            <div
              className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer"
              onClick={() => setDoctorSubmenuOpen(!doctorSubmenuOpen)}
            >
              <MedicalServicesIcon className="text-white" />
              <span className="flex-grow ml-4 text-base font-semibold text-white">
                Doctors
              </span>
              {doctorSubmenuOpen ? (
                <ExpandLessIcon className="text-white" />
              ) : (
                <ExpandMoreIcon className="text-white" />
              )}
            </div>
            {doctorSubmenuOpen && (
              <ul className="mt-0">
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link to="/admin/doctor/list" className="text-black">
                    Doctor List
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li
            className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer mb-2"
            onClick={handleLogout} // Add onClick handler for logout
          >
            <LogoutIcon className="text-white" />
            <span className="ml-4 text-base font-semibold text-white">
              Logout
            </span>
          </li>
          {/* ... Add more sections as needed ... */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
