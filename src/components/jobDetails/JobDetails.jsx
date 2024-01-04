import React, { useEffect, useState } from "react";
import "./jobDetails.scss";
import { useParams } from 'react-router-dom';
import { Header } from "../MainPage/Header/Header";
import axios from "axios";

const JobDetails = () => {
  const [viewJobDetails, setViewJobDetails] = useState({});
  const {id}= useParams();

  useEffect(() => {
    console.log('Fetching data for _id:', id);

    const fetchData = async () => {
      try {
        console.log('Before axios request - _id:', id);

        const response = await axios.get(`http://localhost:4001/user/viewjobdetails?_id=${id}`);
        
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
          <p>
            WordPress Development work from home job/internship at Adyaka
            Infosec Private Limited
          </p>
        </div>

        <div className="main-description" key={viewJobDetails._id}>
          <p id="posted">1w ago. {viewJobDetails.remote ? 'remote' : 'office'}</p>
          <h2>{viewJobDetails.companyName}</h2>
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
              <p>{viewJobDetails.skills}</p>
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
