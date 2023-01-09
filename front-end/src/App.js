
import { Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage.js';
import Register from "./pages/auth/Register.js";
import Login from "./pages/auth/Login.js"
import Courses from "./pages/Courses.js";
import './index.css'
import DashBoard from "./pages/DashBoard.js";
function App() {
  return (
    
    <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/courseselection" element={<Courses/>} />
      </Routes> 
  )
}

export default App;


