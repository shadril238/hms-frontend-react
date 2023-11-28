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
import RoomPage from "./pages/room-page/roomPage";
import HMSCommunity from "./components/community/HMSCommunity";
import PatientHomePage from "./pages/home/PatientHomePage";
import DoctorHomePage from "./pages/home/DoctorHomePage";
import DoctorRegistration from "./pages/register-patient/doctorRegister";
import Authenticate from "./Authenticate";
import DoctorPatientsList from "./pages/list/doctorPatientList";
import DoctorPatientSingle from "./pages/single/DoctorPatientSingle";
import AdminDoctorDatatable from "./components/patients/datatable/AdminDoctorDatatable";
import AdminDoctorProfile from "./components/patients/profilepage/adminDoctorProfile";
import AdminDoctorList from "./pages/list/adminDoctorList";
import AdminDoctorSingle from "./pages/single/AdminDoctorSingle";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="room/:roomId"
              element={<RoomPage key={window.location.pathname} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="patient/register" element={<PatientRegistration />} />
            <Route path="doctor/register" element={<DoctorRegistration />} />

            <Route index element={<Home />} />

            <Route element={<Authenticate requiredRole={"Patient"} />}>
              <Route path="patient">
                <Route index element={<List />} />
                <Route path="home" element={<PatientHomePage />} />
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
                <Route path="doctor/list" element={<List />} />
                <Route path="doctor/:doctorId" element={<Single />} />
              </Route>
            </Route>

            <Route element={<Authenticate requiredRole={"Doctor"} />}>
              <Route path="doctor">
                <Route index element={<List />} />
                <Route path="home" element={<DoctorHomePage />} />
                <Route path="patient/all" element={<DoctorPatientsList />} />
                <Route
                  path="patient/:patientId"
                  element={<DoctorPatientSingle />}
                />
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
            </Route>
            <Route element={<Authenticate requiredRole={"Admin"} />}>
              <Route path="admin">
                <Route index element={<List />} />
                <Route path="patient/list" element={<List />} />
                <Route path="patient/:patientId" element={<Single />} />
                <Route path="doctor/list" element={<AdminDoctorList />} />
                <Route
                  path="doctor/:doctorId"
                  element={<AdminDoctorSingle />}
                />
                <Route path="home" element={<Home />} />

                <Route path=":adminId" element={<Single />} />
                <Route path="new" element={<New />} />
              </Route>
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
