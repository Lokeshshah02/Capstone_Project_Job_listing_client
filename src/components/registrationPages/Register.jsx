import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGlobal } from "../Context/Context";

const Register = () => {
  const navigate = useNavigate();
  const initialValue = { userName: "", email: "", phone: "", password: "" };
  const [formData, setFormData] = useState(initialValue);
  const {login} = useGlobal()

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
      const res = await axios.post("https://job-portal-0aw1.onrender.com/user/signup", formData);
      const { jwtToken, recruiterName, message } = res.data;
  
      if (jwtToken) {
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('userName', recruiterName);
  
        toast.success(message);
        setTimeout(() => {
          navigate("/jobpost");
        }, 1000);
      } else {
        toast.error('Unable to create token');
      }
    } catch (error) {
      console.error("Unable to register", error);
  
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };

  return (
    <section className="register-container">
      <div className="left">
        <div className="left-content">
          <div className="left-heading">
            <h1>Create an account</h1>
            <p>Your personal job finder is here</p>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="info">
                <input
                  type="text"
                  name="userName"
                  placeholder="Name"
                  value={formData.userName}
                  onChange={changeHandler}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={changeHandler}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile"
                  value={formData.phone}
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
              <div className="checkbox">
                <input type="checkbox" name="checkbox" required />
                <span>
                  By creating an account, I agree to our terms of use and
                  privacy policy
                </span>
              </div>
              <div className="buttons">
                <button type="submit">Create Account</button>
              </div>
            </form>
          </div>

          <div className="content">
            <p>
              Already have an account?
              <a href="#" onClick={login}>
                Sign In
              </a>
            </p>
          </div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
      <div className="right"></div>
    </section>
  );
};

export default Register;
