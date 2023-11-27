import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import { FaUserInjured, FaUserMd, FaCalendarAlt } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Home = () => {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Patients by Gender",
        data: [],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const patientResponse = await axiosInstancePatientService.get("/count");
        setPatientCount(patientResponse.data);

        const doctorResponse = await axiosInstanceDoctorService.get("/count");
        setDoctorCount(doctorResponse.data);

        const appointmentResponse = await axiosInstanceAppointmentService.get(
          "/count",
        );
        setAppointmentCount(appointmentResponse.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCounts();

    const fetchPatientDetails = async () => {
      try {
        const response = await axiosInstancePatientService.get("/all");
        const patients = response.data;
        const maleCount = patients.filter((p) => p.gender === "Male").length;
        const femaleCount = patients.filter(
          (p) => p.gender === "Female",
        ).length;

        const newChartData = {
          ...chartData,
          datasets: [
            {
              ...chartData.datasets[0],
              data: [maleCount, femaleCount],
            },
          ],
        };
        setChartData(newChartData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPatientDetails();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // This ensures that the chart respects the given height and width
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Patient Distribution by Gender",
      },
      tooltip: {
        enabled: true,
      },
    },
    hover: {
      mode: null,
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div className="home flex">
      <Sidebar />
      <div className="homeContainer flex-1">
        <Navbar />
        <div className="widgets grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          <div className="widget flex flex-col items-center justify-center p-6 shadow-xl rounded-lg bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition duration-300">
            <FaUserInjured className="text-4xl text-blue-500 mb-2" />
            <span className="text-lg font-bold text-gray-700">PATIENTS</span>
            <span className="text-2xl font-semibold">{patientCount}</span>
          </div>
          <div className="widget flex flex-col items-center justify-center p-6 shadow-xl rounded-lg bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 transition duration-300">
            <FaUserMd className="text-4xl text-green-500 mb-2" />
            <span className="text-lg font-bold text-gray-700">DOCTORS</span>
            <span className="text-2xl font-semibold">{doctorCount}</span>
          </div>
          <div className="widget flex flex-col items-center justify-center p-6 shadow-xl rounded-lg bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 transition duration-300">
            <FaCalendarAlt className="text-4xl text-purple-500 mb-2" />
            <span className="text-lg font-bold text-gray-700">
              APPOINTMENTS
            </span>
            <span className="text-2xl font-semibold">{appointmentCount}</span>
          </div>
        </div>

        <div
          className="chart-container p-4 mx-auto"
          style={{ width: "400px", height: "400px", marginLeft: "20px" }}
        >
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
