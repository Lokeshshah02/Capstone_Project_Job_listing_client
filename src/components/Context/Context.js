import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [fetchSingleJob, setFetchSingleJob] = useState(null);
  const [allSkills, setAllSkills] = useState([]);

  const register = () => {
    navigate("/register");
  };
  const login = () => {
    navigate("/login");
  };
  const logOut = () => {
    setIsLoggedIn(false);
    setIsRegistered(false);
    localStorage.removeItem("userName");
  };
  const addJob = () => {
    navigate("/jobPost");
  };

  const cancel = () => {
    navigate("/");
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");

    if (storedUserName) {
      setUserName(storedUserName);
      setIsRegistered(true);
      setIsLoggedIn(true);
    }
  }, []);

  const handleEditJob = (jobId) => {
    axios
      .get("http://localhost:4001/user/fetchJobPost", {
        params: {
          _id: jobId,
        },
      })
      .then((res) => {
        const jobData = res.data;
        if (jobData) {
          setFetchSingleJob(jobData);
          console.log("Job data fetched successfully", jobData);
          navigate("/jobPost", { state: { fetchSingleJob: jobData } });
        } else {
          console.log("Job data", fetchSingleJob);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("fetched id ", jobId);
  };

  const addSkillsToList = (newSkills) => {
    // Split the newSkills by comma
    const skillsArray = newSkills.split(",").map((skill) => skill.trim());

    // Retrieve existing skills from local storage
    const existingSkills = localStorage.getItem("skills");
    console.log("show the skills", existingSkills);

    // Parse the existingSkills as JSON or initialize an empty array
    const parsedSkills = existingSkills ? JSON.parse(existingSkills) : [];
    console.log("show the skills", parsedSkills);

    // Combine existing skills with new skills and remove duplicates
    const updatedSkills = Array.from(
      new Set([...parsedSkills, ...skillsArray])
    );

    // Save the updated skills back to local storage as a JSON string
    localStorage.setItem("skills", JSON.stringify(updatedSkills));

    // Updating the state with the new skills
    setAllSkills((prevSkills) => [...new Set([...prevSkills, ...skillsArray])]);
  };

  return (
    <AppContext.Provider
      value={{
        isRegistered,
        setIsRegistered,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        register,
        login,
        logOut,
        addJob,
        cancel,
        fetchSingleJob,
        setFetchSingleJob,
        handleEditJob,
        allSkills,
        addSkillsToList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobal };
