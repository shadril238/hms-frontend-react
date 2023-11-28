import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import Navbar from "../../components/navbar/Navbar";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";

const DoctorPatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstancePatientService.get("/all");
      const patientsData = response.data.map((patient, index) => ({
        ...patient,
        id: index,
      }));
      setPatients(patientsData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    { field: "patientId", headerName: "Patient ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 120 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "bloodGroup", headerName: "Blood Group", width: 110 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Link to={`/doctor/patient/${params.row.patientId}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="flex">
      <DoctorSidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-semibold text-gray-700 mb-4">
            Patients List
          </h1>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <DataGrid
              rows={patients}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              loading={isLoading}
              style={{ height: 750, width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatientsList;
