import React, {  useState } from "react";
import "./jobPost.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useGlobal } from "../Context/Context";

const JobPost = () => {
  const { cancel, fetchSingleJob, addSkillsToList  } = useGlobal();

  const initialValues = {
    companyName: "",
    addLogoUrl: "",
    jobPosition: "",
    monthlySalary: "",
    jobType: "",
    remote: "",
    location: "",
    jobDescription: "",
    aboutCompany: "",
    skills: "",
    information: "",
  };
  const initialFormData = fetchSingleJob ? { ...fetchSingleJob.fetchJob }: initialValues;

  const [formData, setFormData] = useState(initialFormData);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData._id ? handleEditButton() : jobPost();
  };
  
  const jobPost = () => {
    const jwttoken = localStorage.getItem("jwtToken");
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${jwttoken}`,
      "Content-Type": "application/json",
    };
  
    axios.post("http://localhost:4001/user/jobpost", formData, { headers })
      .then((res) => {
        try {
          if (!jwttoken) {
            toast.error("User not authenticated");
            return;
          }
  
          console.log("Received token from local storage", jwttoken);
  
          toast.success(res.data.message);
          addSkillsToList(formData.skills);
          setTimeout(() => {
            setFormData(initialValues);
          }, 1000);
        } catch (error) {
          console.error("Unable to post job", error.response);
  
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          }
        }
      })
      .catch((error) => {
        console.error("Error posting job", error);
      });
  };
  
  

  const handleEditButton=()=>{
    const jobId = formData._id;

    axios.put(`http://localhost:4001/user/updatejobpost`, formData, {
      params: {
        _id: jobId,
      },
    })
      .then((res)=>{
        setFormData(res.data)
        console.log(res.data)
        toast.success(res.data.message);
       setTimeout(() => {
         setFormData(initialValues)
       }, 1000);
      })
      .catch((error)=>{
       console.log(error)
       if (error.response && error.response.data && error.response.data.message) {
         toast.error(error.response.data.message);
       }
      })

}

  return (
    <div>
      <div className="job-container">
        <div className="description">
          <h2>Add job description</h2>

          <div className="job-details">
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter your company name here"
                  value={formData.companyName}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="link">Add logo URL</label>
                <input
                  type="text"
                  id="link"
                  name="addLogoUrl"
                  placeholder="Enter the link"
                  value={formData.addLogoUrl}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="jobPosition">Job position</label>
                <input
                  type="text"
                  id="jobPosition"
                  name="jobPosition"
                  placeholder="Enter job position"
                  value={formData.jobPosition}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="monthlySalary">Monthly salary</label>
                <input
                  type="text"
                  id="monthlySalary"
                  name="monthlySalary"
                  placeholder="Enter Amount in rupees"
                  value={formData.monthlySalary}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="jobType">Job Type</label>
                <select
                  name="jobType"
                  id="dropdown"
                  value={formData.jobType}
                  onChange={changeHandler}
                >
                  <option value="select">Select</option>
                  <option value="part-time">part-time</option>
                  <option value="full-time">full-time</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="remoteOffice">Remote/office</label>
                <select
                  name="remote"
                  id="remoteOffice"
                  value={formData.remoteOffice}
                  onChange={changeHandler}
                >
                  <option value="Select">Select</option>
                  <option value="remote">remote</option>
                  <option value="office">office</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter Location"
                  value={formData.location}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="jobDescription">Job Description</label>
                <input
                  type="text"
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Type the job description"
                  value={formData.jobDescription}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="aboutCompany">About Company</label>
                <input
                  type="text"
                  id="aboutCompany"
                  name="aboutCompany"
                  placeholder="Type about your company"
                  value={formData.aboutCompany}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="skillsRequired">Skills Required</label>
                <input
                  type="text"
                  id="skillsRequired"
                  name="skills"
                  placeholder="Enter the must-have skills"
                  value={formData.skills}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-field">
                <label htmlFor="additionalInfo">Information</label>
                <input
                  type="text"
                  id="information"
                  name="information"
                  placeholder="Enter the additional information"
                  value={formData.information}
                  onChange={changeHandler}
                />
              </div>
              <div className="button-container">
                <button id="cancel" onClick={cancel}>
                  Cancel
                </button>
                {
                  formData._id ? (
<button id="add" onClick={handleSubmit}>
                  {" "}
                  + update Job
                </button>
                  ):(

                <button id="add" onClick={handleSubmit}>
                  + Add Job
                </button>
                  )
                }
              </div>
              <Toaster position="top-center" reverseOrder={false} />
            </form>
          </div>
        </div>

        <div className="image-container">
          <h2>Recruiter add job details here</h2>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
