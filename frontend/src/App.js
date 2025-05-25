// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import UserDashboard from "./components/userdashboard";
import PostQuery from "./components/postquery";
import MyQueries from "./components/myqueries";
import EditQuery from "./components/editquery";
import 'sweetalert2/src/sweetalert2.scss';
import About from "./components/about";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/postquery" element={<PostQuery />} />
        <Route path="/myqueries" element={<MyQueries />} />
        <Route path="/postquery" element={<PostQuery />} />
        <Route path="/editquery/:id" element={<EditQuery />} />
        <Route path="/about" element={<About />} />

        <Route path="/about" element={<div className="p-6 text-center">About Page Coming Soon!</div>} />
      </Routes>
    </Router>
  );
};

export default App;

