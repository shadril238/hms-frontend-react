import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import axiosInstanceDoctorService from "../../../utils/axiosInstanceDoctorService";
import axiosInstanceRoomService from "../../../utils/axiosInstanceRoomService";
import { toast } from "react-toastify";
import "./datatable.scss";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";

const AdminDoctorDatatable = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});

  useEffect(() => {
    fetchDoctors();
    fetchRooms();
  }, []);

  const fetchDoctors = () => {
    setIsLoading(true);
    axiosInstanceDoctorService
      .get("/list")
      .then((res) => {
        setDoctorsList(res.data.map((item, index) => ({ ...item, id: index })));
      })
      .catch((err) => console.error("Error fetching doctors:", err))
      .finally(() => setIsLoading(false));
  };

  const fetchRooms = () => {
    axiosInstanceRoomService
      .get("/available")
      .then((res) => {
        setRooms(res.data);
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  };

  const approveDoctor = (doctorId) => {
    const roomId = selectedRoom[doctorId];
    if (!roomId) {
      toast.error("Please select a room.");
      return;
    }

    axiosInstanceDoctorService
      .post(`/approve/allocate/${doctorId}/${roomId}`)
      .then(() => {
        toast.success("Doctor approved successfully!");
        fetchDoctors();
      })
      .catch((err) => {
        console.error("Error approving doctor:", err);
        toast.error("Error approving doctor");
      });
  };

  const handleRoomSelection = (doctorId, roomId) => {
    setSelectedRoom({ ...selectedRoom, [doctorId]: roomId });
  };

  const columns = [
    { field: "doctorId", headerName: "Doctor ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "department", headerName: "Department", width: 120 },
    { field: "specialization", headerName: "Specialization", width: 120 },
    { field: "experienceYears", headerName: "Experience Years", width: 120 },
    { field: "qualifications", headerName: "Qualifications", width: 120 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 300,
      renderCell: (params) => {
        if (!params.row.approved) {
          return (
            <>
              <select
                className="bg-white border border-gray-300 rounded mr-2"
                onChange={(e) =>
                  handleRoomSelection(params.row.doctorId, e.target.value)
                }
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Room
                </option>
                {rooms.map((room) => (
                  <option key={room.roomId} value={room.roomNo}>
                    {room.roomNo}
                  </option>
                ))}
              </select>
              <button
                onClick={() => approveDoctor(params.row.doctorId)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                Approve
              </button>
            </>
          );
        } else {
          return (
            <Link to={`/admin/doctor/${params.row.doctorId}`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                View
              </button>
            </Link>
          );
        }
      },
    },
  ];

  return (
    // <div>
    //   <Navbar />
    //   <div className="flex">
    //     <Sidebar />
    <div className="flex-grow p-4">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Doctors List
      </h1>
      <div className="bg-white shadow-md rounded-md overflow-hidden">
        <DataGrid
          rows={doctorsList}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          loading={isLoading}
        />
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default AdminDoctorDatatable;
