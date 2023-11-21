import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstanceUserService from "../../utils/axiosInstanceUserService";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Loggin in");

    const userCredential = {
      email,
      password,
    };

    axiosInstanceUserService.post("/login", userCredential).then((resp) => {
      const data = resp.data;
      console.log("Response from login ", data?.userLoginDetails);
      // Set the token to the local storage
      localStorage.setItem("token", data?.userLoginDetails?.token);
      // Set the role to the local storage
      localStorage.setItem("role", data?.userLoginDetails?.role);

      data?.role == "Patient"
        ? navigate("/patient")
        : data?.role == "Doctor"
        ? navigate("/doctor")
        : navigate("/admin");
    });
  };

  return (
    <div className="max-w-sm mx-auto p-4 border border-black rounded-lg shadow-md">
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <div className="form-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Login"
            className="mx-auto block w-1/2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
