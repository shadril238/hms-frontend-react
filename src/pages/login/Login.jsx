import React from "react";
import "./login.scss";
import LoginForm from "../../components/loginform/LoginForm";
import Navbar from "../../components/navbar/Navbar";
import HmsImg from "../../assets/hms.jpeg";

const Login = () => {
  return (
    <React.Fragment>
      <Navbar />
      <section className="signin-container">
        <div className="signin-img-container">
          <img src={HmsImg} alt="authentication-background" />
        </div>

        <div className="signin-content-container">
          <div className="container">
            <div className="content-wrapper">
              <h2>Login</h2>
              <p>Sign in with your email and password.</p>

              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
