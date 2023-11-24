import React, { useState, useEffect } from "react";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";

const AppointmentPatientBooked = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axiosInstancePatientService
      .get("/profile")
      .then((response) => {
        const patientId = response.data.patientId;

        return axiosInstanceAppointmentService.get(
          `/get/all/patient/${patientId}`,
        );
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => console.error("Error fetching appointments", error));
  }, []);

  const formatTime = (time) => {
    const [hour, minutes] = time.split(":");
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert "00" to "12"
    return `${formattedHour}:${minutes} ${isPM ? "PM" : "AM"}`;
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-gray-700 text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Appointment ID
            </th>
            <th scope="col" className="py-3 px-6">
              Doctor ID
            </th>
            <th scope="col" className="py-3 px-6">
              Date
            </th>
            <th scope="col" className="py-3 px-6">
              Time
            </th>
            <th scope="col" className="py-3 px-6">
              Type
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const startTime = formatTime(
              appointment.doctorAvailability.startTime,
            );
            const endTime = formatTime(appointment.doctorAvailability.endTime);
            const isTelemedicine =
              appointment.appointment.appointmentType === "Telemedicine";
            const isBooked =
              appointment.appointment.appointmentStatus === "Booked";

            return (
              <tr
                className="bg-white border-b"
                key={appointment.appointment.appointmentId}
              >
                <td className="py-4 px-6">
                  {appointment.appointment.appointmentId}
                </td>
                <td className="py-4 px-6">
                  {appointment.appointment.doctorId}
                </td>
                <td className="py-4 px-6">
                  {appointment.doctorAvailability.date}
                </td>
                <td className="py-4 px-6">
                  {startTime} - {endTime}
                </td>
                <td className="py-4 px-6">
                  {appointment.appointment.appointmentType}
                </td>
                <td className="py-4 px-6">
                  {appointment.appointment.appointmentStatus}
                </td>
                <td className="py-4 px-6 text-center">
                  {isTelemedicine && isBooked ? (
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Join Telemedicine
                    </button>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentPatientBooked;
