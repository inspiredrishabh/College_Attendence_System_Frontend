import React, { useState } from "react";
import { FaDownload, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
//setTotalAttendance(
const Teacher = () => {
  const [formData, setFormData] = useState({
    subject: "",
    batch: "",
    attendanceCode: "",
  });
  const [totalAttendance, setTotalAttendance] = useState(0);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle geolocation marking
  const handleMarkGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(
            `Location marked! Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`
          );
        },
        (error) => {
          alert(`Error accessing location: ${error.message}`);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-between">
        {/* Header */}
        <header className="pt-4 text-center">
          <h1 className="text-5xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
            TEACHER DASHBOARD
          </h1>
        </header>

        {/* Main content */}
        <div className="container mx-auto px-4 py-6 sm:py-10 flex-grow">
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-4 sm:mt-6 h-full">
            {/* Left Card - Subject, Batch, Code section */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] hover:shadow-blue-300/20 flex flex-col">
              <div className="p-6 sm:p-8 md:p-10 text-gray-800 flex flex-col h-full">
                <div className="flex flex-col space-y-4 w-full">
                  <div className="flex flex-col">
                    <label
                      htmlFor="subject"
                      className="text-lg font-medium mb-1"
                    >
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter subject name"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="batch" className="text-lg font-medium mb-1">
                      BATCH
                    </label>
                    <input
                      type="text"
                      id="batch"
                      name="batch"
                      value={formData.batch}
                      onChange={handleChange}
                      placeholder="Enter batch name/number"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="attendanceCode"
                      className="text-lg font-medium mb-1"
                    >
                      ATTENDENCE CODE
                    </label>
                    <input
                      type="text"
                      id="attendanceCode"
                      name="attendanceCode"
                      value={formData.attendanceCode}
                      onChange={handleChange}
                      placeholder="Enter or generate code"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button
                    onClick={handleMarkGeolocation}
                    className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all text-lg"
                  >
                    <FaMapMarkerAlt className="mr-2" /> MARK GEOLOCATION
                  </button>
                </div>
              </div>
            </div>

            {/* Right Card - Attendance section */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] hover:shadow-amber-300/20 flex flex-col">
              <div className="p-6 sm:p-8 md:p-10 text-gray-800 flex flex-col h-full">
                <div className="flex flex-col space-y-6">
                  {/* Total Attendance */}
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between ">
                      <div className="flex items-center">
                        <FaUsers className="text-amber-600 text-xl mr-2" />
                        <span className="font-bold text-lg p-3">
                          TOTAL ATTENDENCE :
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-amber-600 p-3">
                        {totalAttendance}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <button className="w-full flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-all text-lg">
                    <FaDownload className="mr-2" /> DOWNLOAD SHEET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-400 bg-gray-900 w-full">
          <p>Made with ♥ by Team : Awadh</p>
        </footer>
      </div>
    </>
  );
};

export default Teacher;
