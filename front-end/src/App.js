
import { Route, Routes } from "react-router-dom";
import LandingPage from './pages/LandingPage.js';
import Register from "./pages/Register.js";
import Login from "./pages/Login.js"
import './App.css'
import './index.css'
import DashBoard from "./pages/DashBoard.js";

function App() {
  return (
    
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard/>} />

      </Routes>
      
    </div>
  )
}

export default App;
