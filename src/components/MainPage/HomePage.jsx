import { useState, useEffect } from "react";
import "./homePage.scss";
import { Header } from "../MainPage/Header/Header";
import vector from "../../assests/Vector.png";
import { RxCross1 } from "react-icons/rx";
import JobListing from "./Job Listing/JobListing";
import { useGlobal } from "../Context/Context";

const HomePage = () => {
  const { isRegistered, isLoggedIn, addJob } = useGlobal();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);

  useEffect(() => {
    // Retrieve skills from local storage
    const storedSkills = localStorage.getItem("skills");
    console.log("getting skills", storedSkills);
    if (storedSkills) {
      // Parse the storedSkills string into a JavaScript array
      const parsedSkills = JSON.parse(storedSkills);

      // Remove duplicates and update the state
      const uniqueSkills = Array.from(new Set(parsedSkills)).filter(
        (skill) => skill.trim() !== ""
      );
      setAllSkills(uniqueSkills);
    }
  }, []);

  const handleSelectedSkills = (e) => {
    const selectedSkill = e.target.value;
    // Exclude default value and prevent duplicates
    if (selectedSkill !== "skills" && !selectedSkills.includes(selectedSkill)) {
      setSelectedSkills((prevSelectedSkills) => [
        ...prevSelectedSkills,
        selectedSkill,
      ]);
    }
  };
  console.log("checking skills", handleSelectedSkills);

  const handleDeleteSkills = (deleteSkill) => {
    // Update the selectedSkills state by filtering out the deleted skill
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== deleteSkill
    );
    setSelectedSkills(updatedSkills);
  };
  const deleteAllSelectedSkills = () => {
    setSelectedSkills([]);
  };
  console.log("clear", deleteAllSelectedSkills);
  return (
    <div>
      <div className="container">
        <div className="header-container">
          <Header />
        </div>

        <div className="job-title-container">
          <div className="inner-box">
            <div className="search-container">
              <img src={vector} alt="" />
              <input
                type="text"
                placeholder="Type any job title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="skills-container">
              {isLoggedIn || isRegistered ? (
                <>
                  <div className="left">
                    <div className="dropdown">
                      <select
                        name="Skills"
                        id="select"
                        onChange={handleSelectedSkills}
                      >
                        <option value="skills">Skills</option>
                        {allSkills.map((skill) => (
                          <option key={skill} value={skill}>
                            {skill}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="skill-name">
                      <div className="names">
                        {selectedSkills.map((skill) => (
                          <p key={skill} className="box">
                            <p>{skill}</p>
                            <span onClick={() => handleDeleteSkills(skill)}>
                              <RxCross1 />
                            </span>
                          </p>
                        ))}{" "}
                      </div>
                    </div>
                    <div className="clear">
                      <p onClick={() => deleteAllSelectedSkills()}>Clear</p>
                    </div>
                  </div>
                  <div className="right">
                    <button type="button" onClick={addJob}>
                      + Add Job
                    </button>
                  </div>
                </>
              ) : (
                <div className="left">
                  <div className="dropdown">
                    <select name="Skills" id="select">
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
                      <p>css</p>
                      <span>
                      
                        <RxCross1 />
                      </span>
                    </div>
                    <div className="names">
                      <p>javascript</p>
                      <span>
                        <RxCross1 />
                      </span>
                    </div>
                  </div>
                  <div className="clear">
                    <p>Clear</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="job-details-container">
          <JobListing
            searchQuery={searchQuery}
            selectedSkills={selectedSkills}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
