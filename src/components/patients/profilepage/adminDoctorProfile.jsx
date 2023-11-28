import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstanceDoctorService from "../../../utils/axiosInstanceDoctorService";
import { toast } from "react-toastify";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";

const AdminDoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetchDoctorData();
  }, [doctorId]);

  const fetchDoctorData = () => {
    axiosInstanceDoctorService
      .get(`/id/${doctorId}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => {
        console.error("Error fetching doctor data:", err);
        toast.error("Error fetching doctor data");
      });
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    // <div>
    //   <Navbar />
    //   <div className="flex">
    //     <Sidebar />
    <div className="admin-doctor-profile p-4 flex-grow">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden my-5 mx-auto">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4 border-b border-gray-400">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Doctor Profile
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200">
            <img
              src="https://www.clipartmax.com/png/middle/98-984206_profile-photo-facebook-profile-picture-icon.png" // Placeholder image URL
              alt="Doctor Profile"
              className="h-24 w-24 rounded-full object-cover mb-4 shadow-lg"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {doctor.firstName} {doctor.lastName}
            </h2>
            <p className="text-gray-600 mb-1">{doctor.careerTitle}</p>
            <p className="text-gray-600">{doctor.department}</p>
          </div>
          <div className="md:w-1/2 p-4 bg-white">
            <div className="profile-details text-gray-700">
              <p className="mb-2">
                <strong>Email:</strong> {doctor.email}
              </p>
              <p className="mb-2">
                <strong>Specialization:</strong> {doctor.specialization}
              </p>
              <p className="mb-2">
                <strong>Designation:</strong> {doctor.designation}
              </p>
              <p className="mb-2">
                <strong>Institute:</strong> {doctor.institute}
              </p>
              <p className="mb-2">
                <strong>Experience:</strong> {doctor.experienceYears} years
              </p>
              <p className="mb-2">
                <strong>Qualifications:</strong> {doctor.qualifications}
              </p>
              <p className="mb-2">
                <strong>License Number:</strong> {doctor.licenseNumber}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default AdminDoctorProfile;
