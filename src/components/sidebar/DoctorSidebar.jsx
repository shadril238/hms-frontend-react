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

const DoctorSidebar = () => {
  const [doctorSubmenuOpen, setDoctorSubmenuOpen] = useState(false);
  const [patientSubmenuOpen, setPatientSubmenuOpen] = useState(false);
  const [inventorySubmenuOpen, setInventorySubmenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-56 h-screen border-r border-gray-200 bg-white">
      <div className="flex items-center justify-center h-12">
        <span className="text-xl font-bold text-purple-600">HMS</span>
      </div>
      <hr />
      <div className="flex-grow overflow-auto">
        <ul className="p-2">
          <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <DashboardIcon className="text-purple-500" />
            <Link to="/" className="ml-2 text-base font-semibold text-gray-600">
              Dashboard
            </Link>
          </li>
          {/* Doctor Section */}
          <li>
            <div
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setDoctorSubmenuOpen(!doctorSubmenuOpen)}
            >
              <PersonAddIcon className="text-purple-500" />
              <span className="flex-grow ml-2 text-base font-semibold text-gray-600">
                Doctors
              </span>
              {doctorSubmenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {doctorSubmenuOpen && (
              <ul className="pl-4">
                <li className="py-1 text-base font-semibold hover:text-purple-600">
                  <Link to="/doctor/appointment/create">
                    Create Appointment
                  </Link>
                </li>
                <li className="py-1 text-base font-semibold hover:text-purple-600">
                  <Link to="/doctor/appointment/getall">
                    Show Appointment Slots
                  </Link>
                </li>
                <li className="py-1 text-base font-semibold hover:text-purple-600">
                  <Link to="/appointment/booked/getall">
                    Show Booked Appointments
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Other sections like Patients, Pharmacy, etc. */}
          {/* ... */}
        </ul>
      </div>
      <div className="flex p-2">{/* Theme toggle or other components */}</div>
    </div>
  );
};

export default DoctorSidebar;
