import React, { useEffect, useState } from "react";
import "./jobDetails.scss";
import { useParams } from "react-router-dom";
import { Header } from "../MainPage/Header/Header";
import axios from "axios";
import { useGlobal } from "../Context/Context";

const JobDetails = () => {
  const [viewJobDetails, setViewJobDetails] = useState({});
  const { isRegistered, isLoggedIn, handleEditJob } = useGlobal(null);
  const { id } = useParams();
  console.log("Fetching data for _id:", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Before axios request - _id:", id);
        const response = await axios.get(
          `https://job-portal-0aw1.onrender.com/user/viewjobdetails?_id=${id}`
        );

        if (response.data.jobPosts) {
          setViewJobDetails(response.data.jobPosts);
          console.log("job post data", response.data);
        }
      } catch (error) {
        console.error("Error fetching job details:", error.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="main-container">
        <div className="header-container">
          <Header />
        </div>

        <div className="job-title">
          <p>About work related Information.</p>
        </div>

        <div className="main-description" key={viewJobDetails._id}>
          <div className="display-date-image">
            <p id="posted">
              1w ago. {viewJobDetails.remote ? "remote" : "office"}
            </p>
            <div className="imageDisplay">
              <div className="image">
                <img src={viewJobDetails.addLogoUrl} alt="" />
                <p>{viewJobDetails.companyName}</p>
              </div>
            </div>
          </div>

          {isLoggedIn || isRegistered ? (
            <>
              <div className="edit-button">
                <h2>{viewJobDetails.jobPosition}</h2>
                <button onClick={() => handleEditJob(viewJobDetails._id)}>
                  Edit job
                </button>
              </div>
            </>
          ) : (
            <p></p>
          )}
          <p id="location">{viewJobDetails.location}</p>

          <div className="stipend-container">
            <div className="stipend">
              <p>Stipend </p>
              <p>Duration</p>
            </div>
            <div className="duration">
              <p>{viewJobDetails.monthlySalary}</p>
            </div>
          </div>

          <div className="about-company">
            <h4>About company</h4>
            <p>{viewJobDetails.aboutCompany}</p>
          </div>

          <div className="about-job">
            <h4>About the job/internship</h4>
            <p>{viewJobDetails.jobDescription}</p>
          </div>

          <div className="skills">
            <h4>Skill(s) required</h4>
            <div className="style-skills">
              {Array.isArray(viewJobDetails.skills) ? (
                viewJobDetails.skills.map((skill, index) => (
                  <p key={index}>{skill}</p>
                ))
              ) : (
                <p>{viewJobDetails.skills}</p>
              )}
            </div>
          </div>

          <div className="info">
            <h4>Additional Information</h4>
            <p>{viewJobDetails.information}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
