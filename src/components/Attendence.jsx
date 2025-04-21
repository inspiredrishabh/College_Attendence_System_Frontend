import React, { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUserCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Attendence = () => {
  const [formData, setFormData] = useState({
    attendanceCode: "",
    studentName: "",
    studentId: "",
  });

  const [accuracyData, setAccuracyData] = useState({
    locationMatch: 0,
    timeStatus: "Pending",
    overallStatus: "Pending",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous states
    setError(null);
    setIsLoading(true);

    // Validate form data
    if (
      !formData.attendanceCode ||
      !formData.studentName ||
      !formData.studentId
    ) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Get geolocation data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          markAttendance(lat, long);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setError(
            "Could not access your location. Please enable location services."
          );
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  const markAttendance = async (lat, long) => {
    try {
      // Prepare data for API
      const attendanceData = {
        lat: lat.toString(),
        long: long.toString(),
        attendanceCode: formData.attendanceCode,
        studentName: formData.studentName,
        studentId: formData.studentId,
      };

      // Make API call
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_MARK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceData),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Success case
        setAccuracyData({
          locationMatch: 100,
          timeStatus: "On Time",
          overallStatus: "Verified",
          message: data.message || "Attendance marked successfully!",
        });
      } else {
        // Handle specific error cases
        if (data.message.includes("not in the attendance range")) {
          setAccuracyData({
            locationMatch: 30, // Low match percentage for out of range
            timeStatus: "On Time",
            overallStatus: "Not Verified",
            message: "You're too far from the attendance location.",
          });
          setError(
            "Location verification failed: You're not within the acceptable range."
          );
        } else if (data.message.includes("invalid")) {
          setAccuracyData({
            locationMatch: 0,
            timeStatus: "Failed",
            overallStatus: "Not Verified",
            message: "The attendance code you entered is incorrect.",
          });
          setError("Attendance code is invalid. Please check and try again.");
        } else {
          // Generic error
          setAccuracyData({
            locationMatch: 0,
            timeStatus: "Failed",
            overallStatus: "Not Verified",
            message: data.message || "Attendance verification failed.",
          });
          setError(
            data.message || "Failed to mark attendance. Please try again."
          );
        }
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      setError("Network error. Please check your connection and try again.");
      setAccuracyData({
        locationMatch: 0,
        timeStatus: "Error",
        overallStatus: "Not Verified",
        message: "System could not process your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-between">
      {/* Header */}
      <header className="pt-4 text-center">
        <h1 className="text-5xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
          ATTENDENCE PAGE
        </h1>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-10 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-2 sm:mt-1 h-full">
          {/* Attendance Form Card */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-amber-300/20 flex flex-col md:min-h-[400px]">
            <div className="p-6 sm:p-8 md:p-10 text-gray-800 flex flex-col h-full">
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center">
                Mark Your Attendance
              </h2>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full"
              >
                <div className="flex flex-col">
                  <label
                    htmlFor="attendanceCode"
                    className="text-lg font-medium mb-1"
                  >
                    Attendance Code
                  </label>
                  <input
                    type="text"
                    id="attendanceCode"
                    name="attendanceCode"
                    value={formData.attendanceCode}
                    onChange={handleChange}
                    placeholder="Enter the attendance code"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="studentName"
                    className="text-lg font-medium mb-1"
                  >
                    Student Name
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="studentId"
                    className="text-lg font-medium mb-1"
                  >
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="Enter your student ID"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-800"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`mt-4 flex items-center justify-center ${
                    isLoading
                      ? "bg-amber-400"
                      : "bg-amber-600 hover:bg-amber-700"
                  } text-white py-2 sm:py-3 px-6 sm:px-10 rounded-lg font-medium transition-all text-base sm:text-lg`}
                >
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <FaUserCheck className="mr-2" /> Mark Attendance
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Accuracy Card */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-blue-300/20 flex flex-col md:min-h-[400px]">
            <div className="p-6 sm:p-8 md:p-10 text-gray-800 flex flex-col h-full">
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-center">
                Verification Status
              </h2>

              <div className="bg-white rounded-lg p-6 shadow-md flex-grow flex flex-col justify-center">
                {/* Location Match Accuracy */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-600" /> Location
                      Match
                    </span>
                    <span className="font-bold">
                      {accuracyData.locationMatch}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        accuracyData.locationMatch > 70
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${accuracyData.locationMatch}%` }}
                    ></div>
                  </div>
                </div>

                {/* Time Status */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Time Status</span>
                    <span
                      className={`font-bold ${
                        accuracyData.timeStatus === "On Time"
                          ? "text-green-600"
                          : accuracyData.timeStatus === "Pending"
                          ? "text-gray-600"
                          : "text-amber-600"
                      }`}
                    >
                      {accuracyData.timeStatus}
                    </span>
                  </div>
                  <div className="w-full p-2 bg-gray-100 rounded-lg text-center">
                    {accuracyData.message ||
                      (accuracyData.timeStatus === "Pending"
                        ? "Mark your attendance to see verification status"
                        : accuracyData.timeStatus === "On Time"
                        ? "You're marking attendance within the allowed window"
                        : "There was an issue with your attendance submission")}
                  </div>
                </div>

                {/* Overall Status */}
                <div className="mt-4 p-4 rounded-lg border flex items-center justify-center">
                  {accuracyData.overallStatus === "Verified" ? (
                    <div className="flex items-center text-green-600">
                      <FaCheckCircle className="text-2xl mr-2" />
                      <span className="font-bold text-xl">Verified</span>
                    </div>
                  ) : accuracyData.overallStatus === "Pending" ? (
                    <div className="flex items-center text-gray-600">
                      <span className="font-bold text-xl">
                        Awaiting Submission
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-600">
                      <FaTimesCircle className="text-2xl mr-2" />
                      <span className="font-bold text-xl">Not Verified</span>
                    </div>
                  )}
                </div>
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
  );
};

export default Attendence;
