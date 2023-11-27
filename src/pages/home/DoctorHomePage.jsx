import React, { useEffect, useState } from "react";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import {
  FaUserMd,
  FaCalendarCheck,
  FaCalendarDay,
  FaClock,
  FaUserInjured,
} from "react-icons/fa";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";

const DoctorHomePage = () => {
  const [doctorId, setDoctorId] = useState(null);
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [todaysAppointments, setTodaysAppointments] = useState(0);
  const [todaysAppointmentList, setTodaysAppointmentList] = useState([]);
  const [patientsDetails, setPatientsDetails] = useState({});

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const profileResponse = await axiosInstanceDoctorService.get(
          "/profile"
        );
        const docId = profileResponse.data.doctorId; // Modify according to your API response structure
        setDoctorId(docId);

        // Fetching all appointments
        const appointmentsResponse = await axiosInstanceAppointmentService.get(
          `/get/all/doctor/${docId}`
        );
        const appointmentsData = appointmentsResponse.data; // Modify according to your API response structure
        setTotalAppointments(appointmentsData.length);
        const uniquePatients = new Set(
          appointmentsData.map((app) => app.patientId)
        );
        setTotalPatients(uniquePatients.size);

        // Fetching today's appointments
        const todaysResponse = await axiosInstanceAppointmentService.get(
          `/get/today/doctor/${docId}`
        );
        setTodaysAppointments(todaysResponse.data.length);
        setTodaysAppointmentList(todaysResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctorProfile();
  }, []);

  useEffect(() => {
    todaysAppointmentList.forEach((appointment) => {
      if (!patientsDetails[appointment.patientId]) {
        axiosInstancePatientService
          .get(`/id/${appointment.patientId}`)
          .then((response) => {
            setPatientsDetails((prevDetails) => ({
              ...prevDetails,
              [appointment.patientId]: response.data,
            }));
          })
          .catch((error) =>
            console.error(`Error fetching patient details:`, error)
          );
      }
    });
  }, [todaysAppointmentList, patientsDetails]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Patients Card */}
        <Card className="shadow-lg rounded-lg p-6 text-center">
          <CardContent>
            <FaUserMd className="text-4xl text-blue-500 mb-3 mx-auto" />
            <Typography variant="h5">Total Patients</Typography>
            <Typography variant="subtitle1">{totalPatients}</Typography>
          </CardContent>
        </Card>

        {/* Total Appointments Card */}
        <Card className="shadow-lg rounded-lg p-6 text-center">
          <CardContent>
            <FaCalendarCheck className="text-4xl text-green-500 mb-3 mx-auto" />
            <Typography variant="h5">Total Appointments</Typography>
            <Typography variant="subtitle1">{totalAppointments}</Typography>
          </CardContent>
        </Card>

        {/* Today's Appointments Count Card */}
        <Card className="shadow-lg rounded-lg p-6 text-center">
          <CardContent>
            <FaCalendarDay className="text-4xl text-red-500 mb-3 mx-auto" />
            <Typography variant="h5">Today's Appointments</Typography>
            <Typography variant="subtitle1">{todaysAppointments}</Typography>
          </CardContent>
        </Card>
      </div>

      {/* Today's Appointments List */}
      <Card sx={{ marginTop: 4, marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Today's Appointments
          </Typography>
          <List>
            {todaysAppointmentList.map((appointment, index) => {
              const patientDetail = patientsDetails[appointment.patientId];
              return (
                <React.Fragment key={index}>
                  {index !== 0 && <Divider variant="inset" component="li" />}
                  <ListItem alignItems="flex-start">
                    <FaUserInjured className="text-xl text-blue-500 mr-3" />
                    <div>
                      <Typography variant="subtitle1">
                        {patientDetail
                          ? `${patientDetail.firstName} ${patientDetail.lastName}`
                          : "Loading..."}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Appointment Type: {appointment.appointmentType} |
                        Status: {appointment.appointmentStatus}
                      </Typography>
                    </div>
                    <Typography variant="body2" style={{ marginLeft: "auto" }}>
                      <FaClock className="mr-1" />
                      {appointment?.appointmentStatus}
                    </Typography>
                  </ListItem>
                </React.Fragment>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorHomePage;
