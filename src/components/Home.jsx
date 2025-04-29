import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-between">
      {/* Header */}
      <header className="pt-8 pb-6 text-center">
        <h1 className="text-5xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
          Attendance Management System
        </h1>
        <p className="mt-1 text-gray-300 text-lg">
          Streamlining attendance tracking for educational excellence
        </p>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 sm:py-10 flex-grow">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 mt-4 sm:mt-6 h-full">
          {/* Student Section */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-amber-300/20 flex flex-col md:min-h-[400px]">
            <div className="p-6 sm:p-8 md:p-10 text-gray-800 flex flex-col h-full items-center justify-center text-center">
              <FaUserGraduate className="text-5xl sm:text-6xl md:text-7xl text-amber-600 mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">
                Are you a Student?
              </h2>
              <Link to="/attendance">
                <button className="flex items-center bg-amber-600 hover:bg-amber-700 text-white py-2 sm:py-3 px-6 sm:px-10 rounded-lg font-medium transition-all text-base sm:text-lg">
                  Sign In <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>

          {/* Teacher Section */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-blue-300/20 flex flex-col md:min-h-[400px]">
            <div className="p-6 sm:p-8 md:p-10 text-gray-800 flex flex-col h-full items-center justify-center text-center">
              <FaChalkboardTeacher className="text-5xl sm:text-6xl md:text-7xl text-blue-600 mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-8">
                Are you a Teacher?
              </h2>
              <Link to="/teacher">
                <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-6 sm:px-10 rounded-lg font-medium transition-all text-base sm:text-lg">
                  Sign In <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-400 bg-gray-900 w-full">
        <p>Made with ♥ by RPS</p>
      </footer>
    </div>
  );
};

export default Home;
