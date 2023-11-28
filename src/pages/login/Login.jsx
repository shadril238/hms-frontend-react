import React from "react";
import LoginForm from "../../components/loginform/LoginForm";
import Navbar from "../../components/navbar/Navbar";
import OpenNavbar from "../../components/navbar/openNav";

const Login = () => {
  return (
    <React.Fragment>
      <OpenNavbar />
      <section
        className="flex justify-center items-center h-screen"
        style={{
          backgroundColor: "#f0f4f8", // Adjust the background color as needed
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-xl mx-auto">
          {" "}
          {/* Changed max-w-lg to max-w-xl */}
          <div className="content-wrapper text-center">
            {/* <h2 className="text-3xl font-bold mb-4">Login</h2> */}
            <p className="mb-6 text-lg">
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
