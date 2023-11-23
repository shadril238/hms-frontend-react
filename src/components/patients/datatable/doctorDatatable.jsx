import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axiosInstanceDoctorService from "../../../utils/axiosInstanceDoctorService";

const DoctorDatatable = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstanceDoctorService
      .get("/department/list")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const fetchDoctors = (department) => {
    setIsLoading(true);
    const url = department ? `/department/${department}` : "/approved/list";
    axiosInstanceDoctorService
      .get(url)
      .then((response) => {
        setDoctorsList(
          response.data.map((item, index) => ({ ...item, id: index })),
        );
      })
      .catch((error) => {
        console.error("Error fetching doctors data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setSelectedDepartment(department);
    fetchDoctors(department);
  };

  const columns = [
    { field: "doctorId", headerName: "Doctor ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "careerTitle", headerName: "Career Title", width: 130 },
    { field: "department", headerName: "Department", width: 120 },
    { field: "specialization", headerName: "Specialization", width: 110 },
    { field: "designation", headerName: "Designation", width: 110 },
    { field: "experienceYears", headerName: "Experience Years", width: 100 },
    { field: "qualifications", headerName: "Qualifications", width: 120 },
    // { field: "gender", headerName: "Gender", width: 120 },
    // { field: "biography", headerName: "Biography", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Link to={`/patient/doctor/${params.row.doctorId}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-700">Doctor List</h1>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="department-select"
            className="font-medium text-gray-600"
          >
            Select Department:
          </label>
          <select
            id="department-select"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="p-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <DataGrid
          rows={doctorsList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          loading={isLoading}
          style={{ height: 750, width: "100%" }}
          className="border-separate border border-gray-200"
          getRowClassName={() => "bg-white hover:bg-gray-100"}
        />
      </div>
    </div>
  );
};

export default DoctorDatatable;
