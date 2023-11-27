import { useEffect, useState } from "react";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import { FaHeartbeat, FaRulerVertical, FaWeight } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const PatientHomePage = () => {
  const [healthData, setHealthData] = useState(null);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axiosInstancePatientService.get(
          "/health-records/all"
        );
        const data = response.data;
        if (data && data.length > 0) {
          setHealthData(data[0]); // latest health data for cards
          processChartData(data); // all health data for chart
        } else {
          console.error("No health data available");
        }
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    fetchHealthData();
  }, []);

  const processChartData = (data) => {
    const dates = data.map((item) => item.checkupDate);
    const bodyTemperatures = data.map((item) => item.bodyTemperature);
    const pulseRates = data.map((item) => item.pulseRate);
    const bloodSugars = data.map((item) => item.bloodSugar);

    setChartData({
      labels: dates,
      datasets: [
        {
          label: "Body Temperature",
          data: bodyTemperatures,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Pulse Rate",
          data: pulseRates,
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
        {
          label: "Blood Sugar",
          data: bloodSugars,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
        },
      ],
    });
  };

  const calculateBMI = (heightInCm, weightInKg) => {
    if (heightInCm && weightInKg) {
      const heightInMeters = heightInCm / 100;
      return (weightInKg / heightInMeters ** 2).toFixed(2);
    }
    return "N/A";
  };

  const calculateBMR = (heightInCm, weightInKg, age, gender) => {
    console.log(heightInCm);
    console.log(weightInKg);
    console.log(age);
    console.log(gender);
    if (heightInCm && weightInKg && age && gender) {
      if (gender === "Male") {
        return 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * 22.2;
      } else {
        return 447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * 22.4;
      }
    }
    return 88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * 22.55;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {healthData ? (
          <>
            <div className="card bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <FaRulerVertical className="text-4xl text-blue-500 mb-3 mx-auto" />
              <h3 className="text-xl font-bold mb-2">BMI</h3>
              <p className="text-lg">
                {calculateBMI(healthData.heightInCm, healthData.weightInKg)}
              </p>
            </div>

            <div className="card bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <FaWeight className="text-4xl text-green-500 mb-3 mx-auto" />
              <h3 className="text-xl font-bold mb-2">BMR</h3>
              <p className="text-lg">
                {calculateBMR(
                  healthData.heightInCm,
                  healthData.weightInKg,
                  healthData.age,
                  healthData.gender
                )}
              </p>
            </div>

            <div className="card bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <FaHeartbeat className="text-4xl text-red-500 mb-3 mx-auto" />
              <h3 className="text-xl font-bold mb-2">Blood Pressure</h3>
              <p className="text-lg">{healthData.bloodPressure || "N/A"}</p>
            </div>
          </>
        ) : (
          <p className="col-span-3 text-center">Loading health data...</p>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Health Trends</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default PatientHomePage;
