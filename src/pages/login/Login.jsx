import React from "react";
import LoginForm from "../../components/loginform/LoginForm";
import Navbar from "../../components/navbar/Navbar";
import HmsImg from "../../assets/hms.jpeg";

const Login = () => {
  return (
    <React.Fragment>
      <Navbar />
      <section
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${HmsImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-blue-100 p-6 rounded-lg shadow-2xl max-w-md mx-auto">
          <div className="content-wrapper text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Login</h2>
            <p className="mb-6 text-white text-lg">
              Sign in with your email and password.
            </p>

            <LoginForm />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
