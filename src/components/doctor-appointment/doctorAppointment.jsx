import React, { useState } from "react";
import axios from "axios";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    perPatientTimeInMinutes: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstanceAppointmentService
      .post("/create", appointmentData)
      .then((response) => {
        console.log("Appointment created:", response.data);
        toast.success(
          response?.data?.message || "Appointment created successfully!",
        );
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        toast.error(
          error?.response?.data?.message || "Failed to create appointment!",
        );
      });
  };

  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-12 pt-8 pb-8 mb-4 w-full max-w-2xl"
      >
        <h2 className="text-center text-3xl mb-8">
          Doctor's Appointment Schedule
        </h2>

        {/* Appointment Date */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            value={appointmentData.date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startTime"
          >
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            id="startTime"
            value={appointmentData.startTime}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endTime"
          >
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            id="endTime"
            value={appointmentData.endTime}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Per Patient Time */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="perPatientTimeInMinutes"
          >
            Per Patient Time (Minutes)
          </label>
          <input
            type="number"
            name="perPatientTimeInMinutes"
            id="perPatientTimeInMinutes"
            min="1"
            value={appointmentData.perPatientTimeInMinutes}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg" // Increased padding and font size
          >
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorAppointment;
