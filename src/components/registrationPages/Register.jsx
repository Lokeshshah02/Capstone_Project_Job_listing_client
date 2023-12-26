import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const initialValue = { userName: "", email: "", phone: "", password: "" };
  const [formData, setFormData] = useState(initialValue);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4001/user/signup", formData)
      .then((res) => {
        console.log(res.data);
        const registerJwtToken = res.data.jwtToken;
  
        if (registerJwtToken) {
          localStorage.setItem('jwtToken', registerJwtToken);
  
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/jobpost");
          }, 1000);
        } else {
          toast.error('unable to create token');
        }
      })
      .catch((error) => {
        console.log("unable to register", error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        }
      });
  };
  
  

  const handleClick = () => {
    navigate('/login');
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
              <a href="#" onClick={handleClick}>
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
