import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/patients/datatable/Datatable";
import PatientSidebar from "../../components/sidebar/PatientSidebar";
import "./list.scss";
import DoctorDatatable from "../../components/patients/datatable/doctorDatatable";

const PatientDoctorList = () => {
  return (
    <div className="list">
      <PatientSidebar />
      <div className="homeContainer">
        <Navbar />
        <DoctorDatatable />
      </div>
    </div>
  );
};

export default PatientDoctorList;
