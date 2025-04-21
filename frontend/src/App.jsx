import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Attendence from "./components/Attendence";
import Teacher from "./components/Teacher";

const App = () => {
  const attendanceData = {
    accuracyData: {
      locationMatch: 98,
      timeStatus: "On Time",
      overallStatus: "Verified",
    },
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/attendance"
          element={<Attendence {...attendanceData} />}
        />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
