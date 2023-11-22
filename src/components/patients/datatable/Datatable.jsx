import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstancePatientService from "../../../utils/axiosInstancePatientService";
import { toast } from "react-toastify";

const Datatable = () => {
  const [patientsList, setPatientsList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const approvePatient = (patientId) => {
    axiosInstancePatientService
      .post(`/approve/${patientId}`)
      .then((res) => {
        toast.success("Patient approved successfully!");
        setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((err) => {
        console.error("Error approving patient:", err);
        toast.error("Error approving patient");
      });
  };

  //Columns for the data grid
  const columns = [
    { field: "patientId", headerName: "Patient ID", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "dateOfBirth", headerName: "Date of Birth", width: 130 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "bloodGroup", headerName: "Blood Group", width: 130 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "address", headerName: "Address", width: 200 },
    {
      field: "approved",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        return params.value ? "Approved" : "Not Approved";
      },
    },
    {
      field: "view",
      headerName: "Action",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        const commonButtonClasses =
          "text-white font-bold py-1 px-3 rounded text-sm w-24";
        if (!params.row.approved) {
          return (
            <button
              onClick={() => approvePatient(params.row.patientId)}
              className={`bg-green-500 hover:bg-green-700 ${commonButtonClasses}`}
            >
              Approve
            </button>
          );
        } else {
          return (
            <Link to={`/patient/${params.row.patientId}`} className="link">
              <button
                className={`bg-blue-500 hover:bg-blue-700 ${commonButtonClasses}`}
              >
                View
              </button>
            </Link>
          );
        }
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    axiosInstancePatientService
      .get("/all")
      .then((res) => {
        setPatientsList(
          res.data.map((item, index) => ({ ...item, id: index })),
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [refreshKey]); // Depend on refreshKey

  const loadAllPatients = () => {
    setIsLoading(true);
    axiosInstancePatientService
      .get("/all")
      .then((res) => {
        setPatientsList(
          res.data.map((item, index) => ({ ...item, id: index })),
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const loadApprovedPatients = () => {
    setIsLoading(true);
    axiosInstancePatientService
      .get("/all/approved")
      .then((res) => {
        setPatientsList(
          res.data.map((item, index) => ({ ...item, id: index })),
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const loadUnapprovedPatients = () => {
    setIsLoading(true);
    axiosInstancePatientService
      .get("/all/unapproved")
      .then((res) => {
        setPatientsList(
          res.data.map((item, index) => ({ ...item, id: index })),
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="datatable">
      <div className="flex justify-start my-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded mx-1"
          onClick={loadAllPatients}
        >
          All Patients
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white text-sm py-1 px-3 rounded mx-1"
          onClick={loadApprovedPatients}
        >
          Approved Patients
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-3 rounded mx-1"
          onClick={loadUnapprovedPatients}
        >
          Unapproved Patients
        </button>
      </div>

      <DataGrid
        className="datagrid"
        rows={patientsList}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        loading={isLoading}
        sx={{
          "& .MuiDataGrid-cell": {
            padding: "0 4px",
          },
        }}
      />
    </div>
  );
};

export default Datatable;
