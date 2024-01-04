import React, { useEffect, useState } from "react";
import "./jobListing.scss";
// import logo from '../../../assests/logo.png';
import group from "../../../assests/Group.png";
import Vector from "../../../assests/rs.png";
import flag from "../../../assests/flag.png";
import axios from "axios";
import { useGlobal } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

// Frontend
const JobListing = () => {
  const navigate = useNavigate();
  const { isRegistered, isLoggedIn } = useGlobal();

  const [fetchAllJobs, setFetchAllJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/user/getalljobs"
        );

        if (Array.isArray(response.data.job)) {
          setFetchAllJobs(response.data.job);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (id) => {
    console.log("View Details clicked for job with ID:", id);
    navigate(`/jobdetails/${id}`);
  };

  return (
    <>
      {fetchAllJobs.map((job) => (
        <div className="joblist" key={job._id}>
          <div className="logo">
            <img src={job.addLogoUrl} alt={`Logo for ${job.companyName}`} />
          </div>
          <div className="content">
            <div className="left">
              <div className="left-one">
                <p>{job.jobPosition}</p>
              </div>
              <div className="left-two">
                <p>
                  <img src={group} id="group" alt="" />
                  11-50
                </p>
                <p>
                  <img src={Vector} id="vector" alt="" />
                  {job.monthlySalary}
                </p>
                <p>
                  <img src={flag} id="flag" alt="" />
                  {job.location}
                </p>
              </div>
              <div className="left-three">
                <p>{job.jobType}</p>
                <p>{job.remote ? "Remote" : "Office"}</p>
              </div>
            </div>
            <div className="right">
              <div className="skills">
                {/* Check if job.skills is an array before mapping */}
                {/* {Array.isArray(job.skills) &&
                    job.skills.map((skill, index) => (
                      <p key={index}>{skill}</p>
                    ))} */}

                <p>{job.skills}</p>
              </div>
              {isRegistered || isLoggedIn ? (
                <div className="buttons">
                  <button type="button">Edit job</button>
                  <button
                    type="button"
                    onClick={() => handleViewDetails(job._id)}
                  >
                    View Details
                  </button>{" "}
                </div>
              ) : (
                <div className="buttons">
                  <button
                    type="button"
                    onClick={() => handleViewDetails(job._id)}
                  >
                    View Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobListing;
