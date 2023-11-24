import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";

const AppointmentPatientBooked = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     axiosInstancePatientService
  //       .get("/profile")
  //       .then((response) => {
  //         const patientId = response.data.patientId;

  //         return axiosInstanceAppointmentService.get(
  //           `/get/all/patient/${patientId}`,
  //         );
  //       })
  //       .then((response) => {
  //         setAppointments(response.data);
  //       })
  //       .catch((error) => console.error("Error fetching appointments", error));
  //   }, []);

  useEffect(() => {
    axiosInstancePatientService
      .get("/profile")
      .then((response) => {
        const patientId = response.data.patientId;
        return axiosInstanceAppointmentService.get(
          `/get/all/patient/${patientId}`,
        );
      })
      .then(async (response) => {
        const appointmentsWithDoctorDetails = await Promise.all(
          response.data.map(async (appointment) => {
            const doctorResponse = await axiosInstanceDoctorService.get(
              `/id/${appointment.appointment.doctorId}`,
            );
            return {
              ...appointment,
              doctorDetails: doctorResponse.data,
            };
          }),
        );
        setAppointments(appointmentsWithDoctorDetails);
      })
      .catch((error) => console.error("Error fetching appointments", error));
  }, []);

  const formatTime = (time) => {
    const [hour, minutes] = time.split(":");
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert "00" to "12"
    return `${formattedHour}:${minutes} ${isPM ? "PM" : "AM"}`;
  };

  const handleJoinTelemedicine = (patientId) => {
    window.open(`/room/${patientId}`, "_blank");
  };

  //   return (
  //     <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
  //       <table className="w-full text-sm text-left text-gray-500">
  //         <thead className="text-xs uppercase bg-gray-700 text-white">
  //           <tr>
  //             <th scope="col" className="py-3 px-6">
  //               Appointment ID
  //             </th>
  //             <th scope="col" className="py-3 px-6">
  //               Doctor ID
  //             </th>
  //             <th scope="col" className="py-3 px-6">
  //               Date
  //             </th>
  //             <th scope="col" className="py-3 px-6">
  //               Time
  //             </th>
  //             <th scope="col" className="py-3 px-6">
  //               Type
  //             </th>
  //             <th scope="col" className="py-3 px-6">
  //               Status
  //             </th>
  //             <th scope="col" className="py-3 px-6">
  //               Action
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {appointments.map((appointment) => {
  //             const startTime = formatTime(
  //               appointment.doctorAvailability.startTime,
  //             );
  //             const endTime = formatTime(appointment.doctorAvailability.endTime);
  //             const isTelemedicine =
  //               appointment.appointment.appointmentType === "Telemedicine";
  //             const isBooked =
  //               appointment.appointment.appointmentStatus === "Booked";

  //             return (
  //               <tr
  //                 className="bg-white border-b"
  //                 key={appointment.appointment.appointmentId}
  //               >
  //                 <td className="py-4 px-6">
  //                   {appointment.appointment.appointmentId}
  //                 </td>
  //                 <td className="py-4 px-6">
  //                   {appointment.appointment.doctorId}
  //                 </td>
  //                 <td className="py-4 px-6">
  //                   {appointment.doctorAvailability.date}
  //                 </td>
  //                 <td className="py-4 px-6">
  //                   {startTime} - {endTime}
  //                 </td>
  //                 <td className="py-4 px-6">
  //                   {appointment.appointment.appointmentType}
  //                 </td>
  //                 <td className="py-4 px-6">
  //                   {appointment.appointment.appointmentStatus}
  //                 </td>
  //                 <td className="py-4 px-6 text-center">
  //                   {isTelemedicine && isBooked ? (
  //                     <button
  //                       onClick={() =>
  //                         handleJoinTelemedicine(
  //                           appointment.appointment.patientId,
  //                         )
  //                       }
  //                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //                     >
  //                       Join Telemedicine
  //                     </button>
  //                   ) : (
  //                     <span className="text-gray-500">N/A</span>
  //                   )}
  //                 </td>
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-gray-700 text-white">
          <tr>
            <th scope="col" className="py-3 px-6">
              Doctor Name
            </th>
            <th scope="col" className="py-3 px-6">
              Department
            </th>
            <th scope="col" className="py-3 px-6">
              Designation
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
            const doctor = appointment.doctorDetails;
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
                  {doctor.firstName + " " + doctor.lastName}
                </td>
                <td className="py-4 px-6">{doctor.department}</td>
                <td className="py-4 px-6">{doctor.designation}</td>
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
                    <button
                      onClick={() =>
                        handleJoinTelemedicine(
                          appointment.appointment.patientId,
                        )
                      }
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
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
