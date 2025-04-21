import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Attendence from "./components/Attendence";
import Teacher from "./components/Teacher";

const App = () => {
  // Environment variables for API endpoints are now loaded from .env file
  // Access them using import.meta.env.VITE_API_*

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance" element={<Attendence />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
