// import React, { useState } from 'react';

// const VerifyPolicy = () => {
//     const [policyId, setPolicyId] = useState('');
//     const [status, setStatus] = useState('');
//     const [error, setError] = useState('');

//     const handleVerify = async () => {
//         setStatus('');
//         setError('');

//         if (!policyId) {
//             setError('Policy ID is required');
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5000/verifyPolicy', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ policyId }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to verify policy');
//             }

//             const data = await response.json();
//             setStatus(data.message || `Policy ${policyId} verified successfully!`);
//         } catch (err) {
//             setError(err.message || 'An error occurred while verifying the policy.');
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//                     Verify Policy
//                 </h2>
//                 <div className="mb-4">
//                     <label
//                         htmlFor="policyId"
//                         className="block text-gray-700 font-medium mb-2"
//                     >
//                         Policy ID:
//                     </label>
//                     <input
//                         type="text"
//                         id="policyId"
//                         value={policyId}
//                         onChange={(e) => setPolicyId(e.target.value)}
//                         placeholder="Enter Policy ID"
//                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />
//                 </div>
//                 <button
//                     onClick={handleVerify}
//                     className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
//                 >
//                     Verify Policy
//                 </button>
//                 {status && (
//                     <p className="mt-4 text-green-600 font-medium text-center">
//                         {status}
//                     </p>
//                 )}
//                 {error && (
//                     <p className="mt-4 text-red-600 font-medium text-center">
//                         {error}
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default VerifyPolicy;


import React, { useState } from 'react';

const VerifyPolicy = () => {
  const [policyId, setPolicyId] = useState('');
  const [action, setAction] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');
    setError('');

    if (!policyId || !action) {
      setError('Both Policy ID and Action are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/verifyPolicy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ policyId, action }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'An error occurred');
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Verify or Reject Policy</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="policyId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Policy ID
          </label>
          <input
            type="text"
            id="policyId"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            placeholder="Enter Policy ID"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="action"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Action
          </label>
          <select
            id="action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Action</option>
            <option value="verify">Verify</option>
            <option value="reject">Reject</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg">
          <strong>Success:</strong> {response}
        </div>
      )}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default VerifyPolicy;
