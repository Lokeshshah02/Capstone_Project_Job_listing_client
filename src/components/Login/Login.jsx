import React, { useState } from "react";
import "./login.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../Context/Context";

const Login = () => {
  const initialValue = { email: "", password: "" };
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();
  const {register} = useGlobal()

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
        "https://job-portal-0aw1.onrender.com/user/login",
        formData
      );
      console.log(response.data);
      const { jwtToken, recruiterName } = response.data;
      localStorage.setItem("jwtToken", jwtToken);
      localStorage.setItem("userName", recruiterName);
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
                <button type="submit">Sign In</button>
              </div>
            </form>
          </div>

          <div className="content">
            <p>
              Don’t have an account?
              <a href="#" onClick={register}>
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
