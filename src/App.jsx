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
import DoctorAppointment from "./pages/doctor-appointment/doctorAppointment";
import AppointmentSlots from "./pages/doctor-appointment/appointmentSlots";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="patient/register" element={<PatientRegistration />} />
            <Route path="patient">
              <Route index element={<List />} />
              <Route path=":patientId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="doctor">
              <Route index element={<List />} />
              <Route path=":doctorId" element={<Single />} />
              <Route path="new" element={<New />} />
              <Route
                path="appointment/create"
                element={<DoctorAppointment />}
              />
              <Route path="appointment/getall" element={<AppointmentSlots />} />
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
