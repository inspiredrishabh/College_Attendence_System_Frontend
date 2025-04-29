import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Attendence from "./components/Attendence";
import Teacher from "./components/Teacher";

const App = () => {
  

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
