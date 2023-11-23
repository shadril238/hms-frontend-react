import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstancePatientService from "../../../utils/axiosInstancePatientService";

const Profile = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);

  useEffect(() => {
    axiosInstancePatientService
      .get(`/id/${patientId}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => {
        console.error("Error fetching patient data:", err);
      });

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
    <div className="p-4">
      {/* Patient Profile Section */}
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-xl overflow-hidden my-5 mx-auto">
        <div className="bg-gray-200 p-4 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Patient Profile
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 flex flex-col items-center bg-gray-100">
            <img
              src="https://www.clipartmax.com/png/middle/98-984206_profile-photo-facebook-profile-picture-icon.png"
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {patient.firstName} {patient.lastName}
            </h2>
            <p className="text-gray-600 mb-1">{patient.gender}</p>
            <p className="text-gray-600">{patient.bloodGroup}</p>
          </div>
          <div className="md:w-1/2 p-4 bg-white">
            <div className="profile-details text-gray-700">
              <p className="mb-2">
                <strong>ID:</strong> {patient.patientId}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {patient.email}
              </p>
              <p className="mb-2">
                <strong>Date of Birth:</strong> {patient.dateOfBirth}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {patient.phoneNumber}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {patient.address}
              </p>
              <p className="mb-2">
                <strong>Status:</strong>{" "}
                {patient.approved ? "Approved" : "Not Approved"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Records Section */}
      <div className="w-full max-w-7xl bg-white shadow-xl rounded-xl overflow-hidden my-5 mx-auto">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Health Records
          </h2>
          <div className="overflow-x-auto relative">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-800 text-white sticky top-0">
                <tr>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Checkup Date
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Height (cm)
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Weight (kg)
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Blood Pressure
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Blood Sugar
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Body Temperature
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Pulse Rate
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Allergies
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Past Surgeries
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Diabetes
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Hypertensive
                  </th>
                  <th className="py-2 px-3 uppercase font-semibold text-sm">
                    Heart Disease
                  </th>
                  {/* Additional headers */}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {healthRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="py-2 px-3">{record.checkupDate}</td>
                    <td className="py-2 px-3">{record.heightInCm}</td>
                    <td className="py-2 px-3">{record.weightInKg}</td>
                    <td className="py-2 px-3">{record.bloodPressure}</td>
                    <td className="py-2 px-3">{record.bloodSugar}</td>
                    <td className="py-2 px-3">{record.bodyTemperature}</td>
                    <td className="py-2 px-3">{record.pulseRate}</td>
                    <td className="py-2 px-3">{record.allergies}</td>
                    <td className="py-2 px-3">{record.pastSurgeries}</td>
                    <td className="py-2 px-3">
                      {record.hasDiabetes ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-3">
                      {record.isHypertensive ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-3">
                      {record.hasHeartDisease ? "Yes" : "No"}
                    </td>
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
