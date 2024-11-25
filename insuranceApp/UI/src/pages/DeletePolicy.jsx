import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeletePolicy = () => {
  const [policyID, setPolicyID] = useState('');
  const navigate = useNavigate();

  const handleDeletePolicy = async () => {
    try {
      const res = await fetch('http://localhost:5000/deletepolicy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ policyId: policyID }),
      });

      const result = await res.json();

      if (result.success) {
        alert('Policy deleted successfully!');
        navigate('/'); // Redirect to dashboard or confirmation page
      } else {
        alert('Failed to delete policy. Please check the Policy ID.');
      }
    } catch (error) {
      console.error('Error deleting policy:', error);
      alert('An error occurred while deleting the policy.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900">
      <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-xl text-center max-w-md w-full">
        <h2 className="text-4xl font-bold text-red-700 mb-6">Delete Policy</h2>
        
        <div className="flex flex-col items-center mb-8">
          <input
            type="text"
            placeholder="Enter Policy ID"
            className="w-full px-4 py-2 mb-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500"
            value={policyID}
            onChange={(e) => setPolicyID(e.target.value)}
          />
          <button
            onClick={handleDeletePolicy}
            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-red-600 underline hover:text-red-800 transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default DeletePolicy;
