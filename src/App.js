import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/registrationPages/Register";
import { Route, Routes } from "react-router-dom";
import JobPost from "./components/JobPost/JobPost"
import HomePage from "./components/MainPage/HomePage";
import JobDetails from "./components/JobDetails/JobDetails"
function App() {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobPost" element={<JobPost />} />
        <Route path="/jobPost/:id" element={<JobPost />} />
        <Route path="/jobDetails/:id" element={<JobDetails/>}/>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
