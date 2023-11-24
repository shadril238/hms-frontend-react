import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { useEffect } from "react";
import axiosInstanceUserService from "./utils/axiosInstanceUserService";
import { toast } from "react-toastify";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientRegistration from "./pages/register-patient/patientRegister";
import DoctorAppointment from "./components/doctor-appointment/doctorAppointment";
import AppointmentSlots from "./components/doctor-appointment/appointmentSlots";
import DoctorBookedAppointments from "./components/doctor-appointment/doctorBookedAppointments";
import AppointmentSlotsPage from "./pages/doctor-appointment-pages/appointmentSlotsPage";
import AppointmentCreate from "./pages/doctor-appointment-pages/appointmentCreate";
import AppointmentBooked from "./pages/doctor-appointment-pages/appointmentBooked";
import DoctorDatatable from "./components/patients/datatable/doctorDatatable";
import PatientDoctorList from "./pages/list/patientDoctorList";
import PatientDoctorProfileWithAppointment from "./pages/single/patientDoctorProfileWithAppointment";
import AppointmentPatientBookedPage from "./pages/doctor-appointment-pages/appointmentPatientBooked";
import RoomPage from "./pages/room-page/RoomPage";
import HMSCommunity from "./components/community/HMSCommunity";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="/room/:roomId"
              element={<RoomPage key={window.location.pathname} />}
            />

            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="patient/register" element={<PatientRegistration />} />
            <Route path="patient">
              <Route index element={<List />} />
              <Route path=":patientId" element={<Single />} />
              <Route path="new" element={<New />} />
              <Route path="doctor/all" element={<PatientDoctorList />} />
              <Route path="community" element={<HMSCommunity />} />
              <Route
                path="appointment/all"
                element={<AppointmentPatientBookedPage />}
              />
              <Route
                path="doctor/:doctorId"
                element={<PatientDoctorProfileWithAppointment />}
              />
            </Route>
            <Route path="doctor">
              <Route index element={<List />} />
              <Route path=":doctorId" element={<Single />} />
              <Route path="new" element={<New />} />
              <Route
                path="appointment/create"
                element={<AppointmentCreate />}
              />
              <Route
                path="appointment/getall"
                element={<AppointmentSlotsPage />}
              />
              <Route
                path="appointment/booked/getall"
                element={<AppointmentBooked />}
              />
            </Route>
            <Route path="admin">
              <Route index element={<List />} />
              <Route path=":adminId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnHover={false}
        transition={Zoom}
      />
    </div>
  );
}

export default App;
