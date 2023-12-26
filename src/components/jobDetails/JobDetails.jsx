import React from "react";
import "./jobDetails.scss";
import { Header } from "../MainPage/Header/Header";
const JobDetails = () => {
  return (
    <div>
      <div className="main-container">
       <div className="header-container">
          <Header/>
       </div>
        
        <div className="job-title">
          <p>
            WordPress Development work from home job/internship at Adyaka
            Infosec Private Limited
          </p>
        </div>

        <div className="main-description">
          <p id="posted">1w ago. Full Time</p>
          <h2>WordPress Development </h2>
          <p id="location">Bangalore | India</p>

          <div className="stipend-container">
            <div className="stipend">
            <p>Stipend  </p>
            <p>Duration</p>
            </div>
            <div className="duration">
            <p>Rs 25000/month</p>
            <p>6 Months</p>
            </div>
          </div>

          <div className="about-company">
            <h4>About company</h4>
            <p>
              We provide technology-based services to help businesses and
              organizations achieve their goals. We offer a wide range of
              services, including software development, system integration,
              network and security services, cloud computing, and data
              analytics. Our primary focus is on leveraging technology to
              streamline business processes, improve productivity, and enhance
              overall efficiency.
            </p>
          </div>
          <div className="about-job">
            <h4>About the job/internship</h4>
            <p>We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end. <br />

Selected intern's day-to-day responsibilities include: <br />
1. Work on the development of theme customization, liquid programming language, and corresponding apps<br />
2. Implement system integrations that are crucial to our success<br />
3. Contribute to the development of HTML5/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences<br />
4. Work on speed optimization and making a mobile-friendly website</p>
          </div>

          <div className="skills">
            <h4>Skill(s) required</h4>
            <div className="style-skills">
            <p>CSS</p>
            <p>HTML</p>
            <p>WordPress</p>
            </div>
          </div>

          <div className="info">
            <h4>Additional Information</h4>
            <p>
              Stipend structure: This is a performance-based internship. In
              addition to the minimum-assured stipend, you will also be paid a
              performance-linked incentive (₹ 2500 per design).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
