import React, { useEffect, useState } from "react";
import "./jobListing.scss";
import group from "../../../assests/Group.png";
import Vector from "../../../assests/rs.png";
import flag from "../../../assests/flag.png";
import axios from "axios";
import { useGlobal } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const JobListing = ({searchQuery, selectedSkills}) => {
  const navigate = useNavigate();
  const { isRegistered, isLoggedIn, handleEditJob } = useGlobal();
  const [searchedJobs, setSearchedJobs] = useState([])

  const [fetchAllJobs, setFetchAllJobs] = useState([]);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/user/getalljobs"
        );

        if (Array.isArray(response.data.job)) {
          setFetchAllJobs(response.data.job);
          console.log(fetchAllJobs)
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchJobs();
  }, []);

  useEffect(()=>{
    if(searchQuery && typeof searchQuery === 'string'){
      const query = searchQuery.toLowerCase();

      const filteredJob = fetchAllJobs.filter(job => job.jobPosition && job.jobPosition.toLowerCase().includes(query));
      
      if(selectedSkills.length > 0 ){
        const filteredBySkills = filteredJob.filter(job => job.skills.some(skill => selectedSkills.includes(skill)));
        setSearchedJobs(filteredBySkills)             
      }else{
        setSearchedJobs(filteredJob) 
      }

    }else if (selectedSkills.length > 0){ //if there is not query in search but skills are selected
      const filteredBySkills = fetchAllJobs.filter(job => job.skills.some(skill => selectedSkills.includes(skill)));
      setSearchedJobs(filteredBySkills)            
    }else{
      setSearchedJobs(fetchAllJobs)  
    }
    
  },[searchQuery, selectedSkills, fetchAllJobs])

  //The job details is done using useParams hook and edit is done with context api
  const handleViewDetails = (id) => {
    console.log("View Details clicked for job with ID:", id);
    navigate(`/jobDetails/${id}`);
  };


  return (
    <>
      {searchedJobs.map((job) => (
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
                {job.skills.map((skill) => (
                  <p key={skill}>{skill}</p>
                ))}
              </div>
              {isRegistered || isLoggedIn ? (
                <div className="buttons">
                  <button type="button" onClick={() => handleEditJob(job._id)}>Edit job</button>
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
