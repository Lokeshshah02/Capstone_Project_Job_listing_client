import React, { useState } from "react";
import "./login.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const initialValue = { email: "", password: "" };
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/user/login",
        formData
      );
      console.log(response.data);
      const { jwtToken } = response.data;
      localStorage.setItem("jwtToken", jwtToken);
      if (jwtToken) {
        toast.success("Logged in successfully");
        setTimeout(() => {
          navigate("/jobpost");
        }, 1000);
      } else {
        toast.error("Wrong credentials. Please try again.");
      }
    } catch (error) {
      console.error("Unable to login", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleClick = () => {
    navigate("/");
  };
  return (
    <section className="login-container">
      <div className="left">
        <div className="left-content">
          <div className="left-heading">
            <h1>Already have an account?</h1>
            <p>Your personal job finder is here</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="info">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={changeHandler}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={changeHandler}
                  required
                />
              </div>

              <div className="buttons">
                <button type="submit">Sign in</button>
              </div>
            </form>
          </div>

          <div className="content">
            <p>
              Don’t have an account?
              <a href="#" onClick={handleClick}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="right"></div>
    </section>
  );
};

export default Login;
