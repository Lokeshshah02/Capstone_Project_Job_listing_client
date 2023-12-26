import React from "react";
import "./homePage.scss";
import img from "../../assests/logo.png";
import { Header } from "../MainPage/Header/Header";
import vector from "../../assests/Vector.png";
import { RxCross1 } from "react-icons/rx";
import JobListing from "./Job Listing/JobListing";

const HomePage = () => {
  return (
    <div>
      <div className="container">
      <div className="header-container">
          <Header/>
       </div>

        <div className="job-title-container">
          <div className="inner-box">
            <div className="search-container">
              <img src={vector} alt="" />
              <input type="text" placeholder="Type any job title" />
            </div>
            <div className="skills-container">
              <div className="left">
                <div className="dropdown">
                  <select name="Skills" id="">
                    <option>Frontend</option>
                    <option>CSS</option>
                    <option>JavaScript</option>
                  </select>
                </div>
                <div className="skill-name">
                  <div className="names">
                    <p>Frontend</p>
                    <span>
                      <RxCross1 />
                    </span>
                  </div>
                  <div className="names">
                    <p>Frontend</p>
                    <span>
                      <RxCross1 />
                    </span>
                  </div>
                  <div className="names">
                    <p>Frontend</p>
                    <span>
                      <RxCross1 />
                    </span>
                  </div>
                </div>
                <div className="clear">
                  <p>Clear</p>
                </div>
              </div>
              <div className="right">
                <button type="button">+ Add Job</button>
              </div>
            </div>
          </div>
        </div>

        <div className="job-details-container">
         <JobListing/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
