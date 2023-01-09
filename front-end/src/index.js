import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Navbar from "./components/NavBar";
import 'tw-elements';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Navbar />
        <App />
    </Router>
);

