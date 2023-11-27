import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";
import axiosInstanceAppointmentService from "../../utils/axiosInstanceAppointmentService";
import { FaUserInjured, FaUserMd, FaCalendarAlt } from "react-icons/fa";
import { Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axiosInstanceInventoryService from "../../utils/axiosInstanceInventoryService";

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
  const [medicineData, setMedicineData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const patientResponse = await axiosInstancePatientService.get("/count");
        setPatientCount(patientResponse.data);

        const doctorResponse = await axiosInstanceDoctorService.get("/count");
        setDoctorCount(doctorResponse.data);

        const appointmentResponse = await axiosInstanceAppointmentService.get(
          "/count"
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
          (p) => p.gender === "Female"
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

    const fetchMedicineInventory = async () => {
      try {
        const response = await axiosInstanceInventoryService.get(
          "/medicine/get-all"
        );
        processMedicineData(response.data);
      } catch (error) {
        console.error("Error fetching medicine inventory:", error);
      }
    };
    fetchMedicineInventory();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0, // Disable animation
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Medicines Distribution by Medicine Type",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const processMedicineData = (medicines) => {
    const medicineCount = medicines.reduce((acc, medicine) => {
      acc[medicine.medicineType] = (acc[medicine.medicineType] || 0) + 1;
      return acc;
    }, {});

    const barColors = [
      "rgba(255, 99, 132, 0.5)",
      "rgba(54, 162, 235, 0.5)",
      "rgba(255, 206, 86, 0.5)",
      "rgba(75, 192, 192, 0.5)",
      "rgba(153, 102, 255, 0.5)",
      "rgba(255, 159, 64, 0.5)",
    ];

    setMedicineData({
      labels: Object.keys(medicineCount),
      datasets: [
        {
          label: "Number of Medicines",
          data: Object.values(medicineCount),
          backgroundColor: barColors.slice(
            0,
            Object.keys(medicineCount).length
          ),
        },
      ],
    });
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

        {/* Charts Container */}
        <div
          className="charts-container"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {/* Pie Chart */}
          <div
            className="chart-container"
            style={{ width: "400px", height: "400px", marginRight: "20px" }}
          >
            <Pie data={chartData} options={chartOptions} />
          </div>

          {/* Bar Chart */}
          <div
            className="chart-container"
            style={{ width: "400px", height: "400px" }}
          >
            <Bar data={medicineData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
