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
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy"; // Import for Pharmacy Icon
import List from "./../../pages/list/List";

const Sidebar = () => {
  const [patientSubmenuOpen, setPatientSubmenuOpen] = useState(false);
  const [doctorSubmenuOpen, setDoctorSubmenuOpen] = useState(false);
  const [pharmacySubmenuOpen, setPharmacySubmenuOpen] = useState(false);
  const [notificationSubmenuOpen, setNotificationSubmenuOpen] = useState(false);

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
          {/* ... Dashboard, Patients ... */}
          {/* Doctor Section */}
          <li className="mb-2">
            <div
              className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer"
              onClick={() => setDoctorSubmenuOpen(!doctorSubmenuOpen)}
            >
              <MedicalServicesIcon className="text-white" />
              <span className="flex-grow ml-4 text-base font-semibold text-white">
                Doctor
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
                  <Link to="/doctor/appointment/create" className="text-black">
                    Doctor List
                  </Link>
                </li>
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link to="/doctor/appointment/getall" className="text-black">
                    Available Appointments
                  </Link>
                </li>
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link
                    to="/doctor/appointment/booked/getall"
                    className="text-black"
                  >
                    Booked Appointments
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Pharmacy Section */}
          <li className="mb-2">
            <div
              className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer"
              onClick={() => setPharmacySubmenuOpen(!pharmacySubmenuOpen)}
            >
              <LocalPharmacyIcon className="text-white" />
              <span className="flex-grow ml-4 text-base font-semibold text-white">
                Pharmacy
              </span>
              {pharmacySubmenuOpen ? (
                <ExpandLessIcon className="text-white" />
              ) : (
                <ExpandMoreIcon className="text-white" />
              )}
            </div>
            {pharmacySubmenuOpen && (
              <ul className="mt-0">
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link to="/pharmacy" className="text-black">
                    Medicine
                  </Link>
                </li>
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link to="/pharmacy" className="text-black">
                    Inventory
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Notifications Section */}
          <li className="mb-2">
            <div
              className="flex items-center p-2 hover:bg-blue-600 bg-blue-500 cursor-pointer"
              onClick={() =>
                setNotificationSubmenuOpen(!notificationSubmenuOpen)
              }
            >
              <NotificationsIcon className="text-white" />
              <span className="flex-grow ml-4 text-base font-semibold text-white">
                Notifications
              </span>
              {notificationSubmenuOpen ? (
                <ExpandLessIcon className="text-white" />
              ) : (
                <ExpandMoreIcon className="text-white" />
              )}
            </div>
            {notificationSubmenuOpen && (
              <ul className="mt-0">
                <li className="py-1 text-base font-semibold hover:bg-gray-100 border border-gray-200 pl-10">
                  <Link to="/notifications" className="text-black">
                    View Notifications
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* ... Add more sections as needed ... */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
