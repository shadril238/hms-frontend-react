import React, { useState, useEffect } from "react";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import { toast } from "react-toastify";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";

const DoctorBookedAppointments = () => {
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [doctorId, setDoctorId] = useState("");

  // useEffect(() => {}, []);

  // const fetchBookedAppointments = () => {
  //   axiosInstanceDoctorService
  //     .get("/profile")
  //     .then((response) => {
  //       setDoctorId(response?.data?.doctorId);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching doctor profile", error);
  //       toast.error("Error fetching doctor id from the token!");
  //     });

  //   if (!selectedDate) {
  //     toast.error("Please select a date.");
  //     return;
  //   }

  //   axiosInstanceAppointmentService
  //     .get(`/get/doctor/${doctorId}/${selectedDate}`)
  //     .then((response) => {
  //       setBookedAppointments(response?.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching booked appointments:", error);
  //       setBookedAppointments([]);
  //       toast.error("Failed to fetch booked appointments!");
  //     });
  // };

  const fetchBookedAppointments = async () => {
    try {
      const doctorProfileResponse = await axiosInstanceDoctorService.get(
        "/profile",
      );
      const doctorId = doctorProfileResponse?.data?.doctorId;
      setDoctorId(doctorId);

      if (!selectedDate) {
        toast.error("Please select a date.");
        return;
      }

      const appointmentsResponse = await axiosInstanceAppointmentService.get(
        `/get/doctor/${doctorId}/${selectedDate}`,
      );
      const appointmentsWithPatientDetails = await Promise.all(
        appointmentsResponse.data.map(async (appointment) => {
          const patientResponse = await axiosInstancePatientService.get(
            `/id/${appointment.patientId}`,
          );
          return {
            ...appointment,
            patientDetails: patientResponse.data,
          };
        }),
      );
      setBookedAppointments(appointmentsWithPatientDetails);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to fetch data!");
    }
  };

  const handleJoinTelemedicine = (patientId) => {
    window.open(`/room/${patientId}`, "_blank");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">
        Doctor's Booked Appointments
      </h1>
      <div className="mb-4 flex items-center">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          onClick={fetchBookedAppointments}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Fetch Appointments
        </button>
      </div>

      <table className="min-w-full table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-center">Appointment ID</th>
            <th className="px-4 py-2 text-center">Patient Name</th>
            <th className="px-4 py-2 text-center">Gender</th>
            <th className="px-4 py-2 text-center">DOB</th>
            <th className="px-4 py-2 text-center">Appointment Type</th>
            <th className="px-4 py-2 text-center">Status</th>
            <th className="px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedAppointments?.length > 0 ? (
            bookedAppointments.map((appointment, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2 text-center">
                  {appointment.appointmentId}
                </td>
                <td className="border px-4 py-2 text-center">
                  {appointment.patientDetails.firstName +
                    " " +
                    appointment.patientDetails.lastName}
                </td>
                <td className="border px-4 py-2 text-center">
                  {appointment.patientDetails.gender}
                </td>
                <td className="border px-4 py-2 text-center">
                  {appointment.patientDetails.dateOfBirth}
                </td>
                <td className="border px-4 py-2 text-center">
                  {appointment.patientDetails.gender}
                </td>
                <td className="border px-4 py-2 text-center">
                  {appointment.appointmentStatus}
                </td>
                <td className="border px-4 py-2 text-center">
                  {appointment.appointmentType === "Telemedicine" && (
                    <button
                      onClick={() =>
                        handleJoinTelemedicine(appointment.patientId)
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Join Telemedicine
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-3">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorBookedAppointments;
