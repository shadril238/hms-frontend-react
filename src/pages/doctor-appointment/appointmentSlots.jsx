import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";

const AppointmentSlots = () => {
  const [doctorId, setDoctorId] = useState("");
  const [slots, setSlots] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    axiosInstanceDoctorService
      .get("/profile")
      .then((response) => {
        setDoctorId(response.data.doctorId);
      })
      .catch((error) => {
        console.error("Error fetching doctor profile", error);
        toast.error("Error fetching doctor id from the token!");
      });
  }, []);

  const fetchSlots = () => {
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }

    axiosInstanceAppointmentService
      .get(`/slots/get/doctor/${doctorId}/${selectedDate}`)
      .then((response) => {
        setSlots(response?.data);
        console.log("Slots:", response?.data);
      })
      .catch((error) => {
        console.error("Error fetching slots:", error);
        setSlots([]);
        toast.error(error?.response?.data?.message || "Error fetching slots!");
      });
  };

  const deleteSlot = (availabilityId) => {
    axiosInstanceAppointmentService
      .delete(`/slots/delete/${availabilityId}`)
      .then(() => {
        toast.success("Slot deleted successfully!");
        fetchSlots(); // Refresh the slots list
      })
      .catch((error) => {
        console.error("Error deleting slot:", error);
        toast.error("Error deleting slot!");
      });
  };

  const formatTime = (time) => {
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold mb-4">
        Doctor's Available Appointment Slots
      </h1>
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          onClick={fetchSlots}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Check Slots
        </button>
      </div>

      <table className="min-w-full table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-center align-middle">S.No</th>
            <th className="px-4 py-2 text-center align-middle">Start Time</th>
            <th className="px-4 py-2 text-center align-middle">End Time</th>
            <th className="px-4 py-2 text-center align-middle">Available</th>
            <th className="px-4 py-2 text-center align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.length > 0 ? (
            slots.map((slot, index) => (
              <tr key={slot.availabilityId} className="border-b">
                <td className="border px-4 py-2 text-center align-middle">
                  {index + 1}
                </td>
                <td className="border px-4 py-2 text-center align-middle">
                  {formatTime(slot.startTime)}
                </td>
                <td className="border px-4 py-2 text-center align-middle">
                  {formatTime(slot.endTime)}
                </td>
                <td className="border px-4 py-2 text-center align-middle">
                  {slot.isAvailable ? "Yes" : "No"}
                </td>
                <td className="border px-4 py-2 text-center align-middle">
                  <button
                    onClick={() => deleteSlot(slot.availabilityId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-3 align-middle">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentSlots;
