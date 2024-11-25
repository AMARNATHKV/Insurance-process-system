import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaClinicMedical, FaUserShield, FaRegBuilding } from 'react-icons/fa';

const OrganizationPage = () => {
  const navigate = useNavigate();

  const goToDashboard = (organization) => {
    // Navigate to the organization dashboard based on selection
    navigate(`/${organization}-dashboard`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-600">
      <h1 className="text-3xl font-bold text-white mb-8">Select Your Organization</h1>

      <div className="grid grid-cols-2 gap-6">
        <div
          onClick={() => goToDashboard('insurer')}
          className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <FaShieldAlt className="text-blue-600 text-5xl mb-2" />
          <h2 className="text-lg font-semibold">Insurer</h2>
        </div>

        <div
          onClick={() => goToDashboard('healthcare-provider')}
          className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <FaClinicMedical className="text-green-600 text-5xl mb-2" />
          <h2 className="text-lg font-semibold">Healthcare Provider</h2>
        </div>

        <div
          onClick={() => goToDashboard('tpa')}
          className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <FaUserShield className="text-purple-600 text-5xl mb-2" />
          <h2 className="text-lg font-semibold">TPA</h2>
        </div>

        <div
          onClick={() => goToDashboard('regulatory-authority')}
          className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg cursor-pointer hover:bg-blue-50"
        >
          <FaRegBuilding className="text-orange-600 text-5xl mb-2" />
          <h2 className="text-lg font-semibold">Regulatory Authority</h2>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
