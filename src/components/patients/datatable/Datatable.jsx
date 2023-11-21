import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstancePatientService from "../../../utils/axiosInstancePatientService";

const Datatable = () => {
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    { field: "isApproved", headerName: "Is Approved", width: 130 },
    { field: "isActive", headerName: "Is Active", width: 130 },
  ];

  useEffect(() => {
    setIsLoading(true);
    axiosInstancePatientService
      .get("/all")
      .then((res) => {
        setPatientsList(
          res.data.map((item, index) => ({ ...item, id: index }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={patientsList}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        loading={isLoading}
      />
    </div>
  );
};

export default Datatable;
