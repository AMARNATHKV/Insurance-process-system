import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSearch, FaClipboardCheck } from "react-icons/fa";

const TPADashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="p-10 bg-gradient-to-b from-purple-300 to-purple-500 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-800">
        TPA Dashboard
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center">
          <FaSearch className="text-6xl text-purple-600 mb-2" />
          <button
            onClick={() => handleNavigate("/medical-reports-by-policy")}
            className="px-6 py-3 bg-purple-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            View Reports
          </button>
        </div>
        <div className="flex flex-col items-center">
          <FaEdit className="text-6xl text-purple-700 mb-2" />
          <button
            onClick={() => handleNavigate("/update-status")}
            className="px-6 py-3 bg-purple-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            Update Status
          </button>
        </div>
        <div className="flex flex-col items-center">
          <FaClipboardCheck className="text-6xl text-purple-800 mb-2" />
          <button
            onClick={() => handleNavigate("/view-allpolicies")}
            className="px-6 py-3 bg-purple-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-purple-600 transition"
          >
            View All Policies
          </button>
        </div>
      </div>
    </div>
  );
};

export default TPADashboard;
