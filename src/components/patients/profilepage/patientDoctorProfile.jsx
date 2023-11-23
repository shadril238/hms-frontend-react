import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstanceDoctorService from "../../../utils/axiosInstanceDoctorService";
import axiosInstanceAppointmentService from "../../../utils/axiosInstanceAppointmentService";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [appointmentSlots, setAppointmentSlots] = useState([]);

  useEffect(() => {
    axiosInstanceDoctorService
      .get(`/id/${doctorId}`)
      .then((res) => {
        setDoctor(res.data);
      })
      .catch((err) => {
        console.error("Error fetching doctor data:", err);
      });

    fetchAppointmentSlots(selectedDate);
  }, [doctorId, selectedDate]);

  const fetchAppointmentSlots = (date) => {
    axiosInstanceAppointmentService
      .get(`/slots/get/doctor/${doctorId}/${date}`)
      .then((res) => {
        setAppointmentSlots(res.data);
        toast.success("Appointment slots found!");
      })
      .catch((err) => {
        console.error("Error fetching appointment slots:", err);
        setAppointmentSlots([]);
        toast.error("No appointment slots found for this date!");
      });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden my-5 mx-auto">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4 border-b border-gray-400">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Doctor Profile
          </h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200">
            <img
              src="https://www.clipartmax.com/png/middle/98-984206_profile-photo-facebook-profile-picture-icon.png"
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
              {/* Doctor details */}
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
      {/* Appointment Slots Section */}
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden my-5 mx-auto">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4 border-b border-gray-400">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Available Appointments
          </h1>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <label htmlFor="appointment-date" className="mr-2">
              <b>Select Date:</b>
            </label>
            <input
              type="date"
              id="appointment-date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1.5 text-sm"
            />
          </div>
          {appointmentSlots.length > 0 ? (
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {/* Appointment Slots Table */}
              <table className="min-w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Time</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentSlots.map((slot) => (
                    <tr key={slot.availabilityId}>
                      <td className="border px-4 py-2">{slot.date}</td>
                      <td className="border px-4 py-2">
                        {slot.startTime} - {slot.endTime}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => bookAppointment(slot.availabilityId)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                        >
                          Book
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-700">
              No appointments found for this date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
