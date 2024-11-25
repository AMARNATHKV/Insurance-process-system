import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileMedical, FaSearch, FaClipboardList, FaBalanceScale } from 'react-icons/fa';

const RegulatoryAuthorityDashboard = () => {
  const navigate = useNavigate();

  // Navigation handlers for buttons
  const handleAudit = () => {
    navigate('/view-allpolicies');
  };


  return (
    <div className="p-10 bg-gradient-to-b from-blue-300 to-blue-500 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-blue-800">Regulatory Authority Dashboard</h2>
      <div className="flex flex-wrap justify-center gap-8">
        
        {/* Audit Reports Button */}
        <div className="flex flex-col items-center">
          <FaBalanceScale className="text-6xl text-yellow-600 mb-2" />
          <button
            onClick={handleAudit}
            className="px-6 py-3 bg-yellow-500 text-white text-lg font-medium rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            Audit Medical Reports
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default RegulatoryAuthorityDashboard;
