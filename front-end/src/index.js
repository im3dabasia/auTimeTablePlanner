// External Modules
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Local Modules
import App from "./App";
import Navbar from "./components/NavBar";

// CSS and Other elements
import "./index.css";
import 'tw-elements';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Navbar />
        <App />
    </Router>
);

