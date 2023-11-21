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
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className="form-group">
        <input type="submit" value="Login" className="button-primary" />
      </div>
    </form>
  );
};

export default LoginForm;