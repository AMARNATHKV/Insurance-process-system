import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileMedical, FaSearch, FaClipboardList } from 'react-icons/fa';

const HealthcareProviderDashboard = () => {
  const navigate = useNavigate();

  const handleSubmitClaim = () => {
    navigate('/submit-report');
  };

  const handleViewClaim = () => {
    navigate('/view-report');
  };


  return (
    <div className="p-10 bg-gradient-to-b from-green-300 to-green-500 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-green-800">Healthcare Provider Dashboard</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex flex-col items-center">
          <FaFileMedical className="text-6xl text-green-600 mb-2" />
          <button
            onClick={handleSubmitClaim}
            className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Submit Medical Report
          </button>
        </div>
        <div className="flex flex-col items-center">
          <FaSearch className="text-6xl text-blue-600 mb-2" />
          <button
            onClick={handleViewClaim}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            View Medical Report
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default HealthcareProviderDashboard;
