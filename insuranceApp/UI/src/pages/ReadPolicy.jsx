import React, { useState } from 'react';

const ReadPolicy = () => {
  const [policyID, setPolicyID] = useState('');
  const [policyData, setPolicyData] = useState(null);

  const handleRetrievePolicy = async () => {
    try {
      const res = await fetch('http://localhost:5000/readpolicy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ policyId: policyID }),
      });

      const result = await res.json();
      
      if (result.success) {
        console.log('Policy data fetched:', result.data); // Debug to ensure data is received
        setPolicyData(result.data);
      } else {
        alert(result.message || 'Failed to retrieve policy data. Please check the Policy ID.');
      }
    } catch (error) {
      console.error('Error fetching policy data:', error);
      alert('An error occurred while retrieving the policy.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-bluw-600 to-blue-900 text-white">
      <h2 className="text-4xl font-bold mb-8">Retrieve Policy</h2>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Enter Policy ID"
          className="px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          value={policyID}
          onChange={(e) => setPolicyID(e.target.value)}
        />
        <button
          onClick={handleRetrievePolicy}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Submit
        </button>
      </div>

      {policyData && (
        <div className="bg-white p-6 rounded-lg shadow-lg text-black w-full max-w-lg">
          <h3 className="text-2xl font-bold mb-4 text-green-800">Policy Details</h3>
          <p><strong>Policy Holder:</strong> {policyData.policyHolder}</p>
          <p><strong>Coverage Amount:</strong> ${policyData.coverageAmount}</p>
          <p><strong>Premium Amount:</strong> ${policyData.premiumAmount}</p>
          <p><strong>Start Date:</strong> {policyData.startDate}</p>
          <p><strong>End Date:</strong> {policyData.endDate}</p>
        </div>
      )}
    </div>
  );
};

export default ReadPolicy;
