// Profile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstancePatientService from "../../../utils/axiosInstancePatientService";

const Profile = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);

  // All patient data is fetched from the server
  useEffect(() => {
    axiosInstancePatientService
      .get(`/id/${patientId}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => {
        console.error("Error fetching patient data:", err);
        // Handle the error appropriately
      });

    // Fetch health records data
    axiosInstancePatientService
      .get(`/health-records/patient/${patientId}`)
      .then((res) => {
        setHealthRecords(res.data);
      })
      .catch((err) => {
        console.error("Error fetching health records:", err);
      });
  }, [patientId]);

  if (!patient) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-8xl bg-white shadow-xl rounded-xl overflow-hidden my-5">
        <div className="bg-gray-200 p-6 border-b border-gray-300">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Patient Profile
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-6 flex justify-center items-center bg-gray-100">
            <img
              src="https://www.clipartmax.com/png/middle/98-984206_profile-photo-facebook-profile-picture-icon.png"
              alt="Profile"
              className="h-36 w-36 rounded-full object-cover"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="profile-details text-gray-700 text-lg">
              <p className="mb-3">
                <strong>ID:</strong> {patient.patientId}
              </p>
              <p className="mb-3">
                <strong>Email:</strong> {patient.email}
              </p>
              <p className="mb-3">
                <strong>Name:</strong> {patient.firstName} {patient.lastName}
              </p>
              <p className="mb-3">
                <strong>Date of Birth:</strong> {patient.dateOfBirth}
              </p>
              <p className="mb-3">
                <strong>Gender:</strong> {patient.gender}
              </p>
              <p className="mb-3">
                <strong>Blood Group:</strong> {patient.bloodGroup}
              </p>
              <p className="mb-3">
                <strong>Phone:</strong> {patient.phoneNumber}
              </p>
              <p className="mb-3">
                <strong>Address:</strong> {patient.address}
              </p>
              <p className="mb-3">
                <strong>Status:</strong>{" "}
                {patient.approved ? "Approved" : "Not Approved"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-8xl bg-white shadow-xl rounded-xl overflow-hidden my-5">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Health Records
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {/* Table Headers */}
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Checkup Date
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Height (cm)
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Weight (kg)
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Blood Pressure
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Blood Sugar
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Body Temperature
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Pulse Rate
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Allergies
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Past Surgeries
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Diabetes
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Hypertensive
                  </th>
                  <th className="py-3 px-4 uppercase font-semibold text-sm">
                    Heart Disease
                  </th>
                  {/* Additional headers */}
                  {/* ... */}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {healthRecords.map((record, index) => (
                  <tr key={index}>
                    {/* Table Cells */}
                    <td className="py-3 px-4">{record.checkupDate}</td>
                    <td className="py-3 px-4">{record.heightInCm}</td>
                    <td className="py-3 px-4">{record.weightInKg}</td>
                    <td className="py-3 px-4">{record.bloodPressure}</td>
                    <td className="py-3 px-4">{record.bloodSugar}</td>
                    <td className="py-3 px-4">{record.bodyTemperature}</td>
                    <td className="py-3 px-4">{record.pulseRate}</td>
                    <td className="py-3 px-4">{record.allergies}</td>
                    <td className="py-3 px-4">{record.pastSurgeries}</td>
                    <td className="py-3 px-4">
                      {record.hasDiabetes ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4">
                      {record.isHypertensive ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4">
                      {record.hasHeartDisease ? "Yes" : "No"}
                    </td>
                    {/* Additional cells */}
                    {/* ... */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
