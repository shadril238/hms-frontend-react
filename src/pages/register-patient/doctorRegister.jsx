import React, { useState } from "react";
import axiosInstanceDoctorService from "../../utils/axiosInstanceDoctorService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OpenNavbar from "../../components/navbar/openNav";

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    careerTitle: "",
    department: "",
    specialization: "",
    designation: "",
    institute: "",
    experienceYears: "",
    qualifications: "",
    licenseNumber: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    phoneNumber: "",
    biography: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstanceDoctorService
      .post("/register", formData)
      .then((response) => {
        toast.success(
          response?.data?.message || "Doctor registered successfully!",
        );
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderInputField = (key) => {
    switch (key) {
      case "gender":
        return (
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        );
      case "bloodGroup":
        return (
          <select
            name="bloodGroup"
            id="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Blood Group</option>
            <option value="A_Positive">A+</option>
            <option value="A_Negative">A-</option>
            <option value="B_Positive">B+</option>
            <option value="B_Negative">B-</option>
            <option value="AB_Positive">AB+</option>
            <option value="AB_Negative">AB-</option>
            <option value="O_Positive">O+</option>
            <option value="O_Negative">O-</option>
          </select>
        );
      case "biography":
        return (
          <textarea
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            required
            rows="3"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        );
      case "experienceYears":
        return (
          <input
            type="number"
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
      case "dateOfBirth":
        return (
          <input
            type="date"
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
      default:
        return (
          <input
            type={
              key === "password"
                ? "password"
                : key === "email"
                ? "email"
                : "text"
            }
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        );
    }
  };

  return (
    <React.Fragment>
      <OpenNavbar />
      <div className="mt-7 bg-gray-100">
        <div className="flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-12 pt-8 pb-8 mb-4 w-full max-w-2xl"
          >
            <h2 className="text-center text-3xl mb-8">Doctor Registration</h2>
            {Object.keys(formData).map((key) => (
              <div className="mb-4" key={key}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={key}
                >
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                </label>
                {renderInputField(key)}
              </div>
            ))}
            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline text-lg"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DoctorRegistration;
