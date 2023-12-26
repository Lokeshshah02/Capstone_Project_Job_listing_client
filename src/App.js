import './App.css';
import Login from './components/Login/Login';
import Register from './components/registrationPages/Register';
import JobPost from './components/jobPost/JobPost';
import JobDetails from './components/jobDetails/JobDetails'
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/MainPage/HomePage';


function App() {
  return (
    <div>
 <Routes>
<Route path="/" element={<Register/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/jobPost" element={<JobPost/>}/>
<Route path="/jobDetails" element={<JobDetails/>}/>
<Route path="/home" element={<HomePage/>}/>
 </Routes>
     
    </div>
  );
}

export default App;
