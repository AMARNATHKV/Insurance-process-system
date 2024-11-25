import React, { useState } from "react";
import { toast } from "react-toastify";

const PolicyDashboard = () => {
  const [allPolicyData, setAllPolicyData] = useState([]);
  const [verifiedPolicyData, setVerifiedPolicyData] = useState([]);

  // Fetch all policies
  const fetchAllPolicies = async () => {
    try {
      const res = await fetch("http://localhost:5000/viewAllPolicies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log("All Policies Response:", result);

      if (result.success && result.data.result) {
        setAllPolicyData(result.data.result); // Save all policies to state
        toast.success("All policies retrieved successfully");
      } else {
        toast.error("No policies found");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An error occurred while fetching all policies");
    }
  };

  // Fetch verified policies
  const fetchVerifiedPolicies = async () => {
    try {
      const res = await fetch("http://localhost:5000/viewVerifiedPolicies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      console.log("Verified Policies Response:", result);

      if (result.success && result.data.result) {
        setVerifiedPolicyData(result.data.result); // Save verified policies to state
        toast.success("Verified policies retrieved successfully");
      } else {
        toast.error("No verified policies found");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("An error occurred while fetching verified policies");
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-400 to-blue-300 min-h-screen flex items-center justify-center p-6">
      <div className="bg-transparent p-8 rounded-lg max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          RegulatoryAuthority Dashboard
        </h2>

        {/* Buttons to fetch policies */}
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchAllPolicies}
            className="bg-teal-500 text-white px-6 py-2 rounded-md mr-4"
          >
            View All Policies
          </button>
          <button
            onClick={fetchVerifiedPolicies}
            className="bg-teal-500 text-white px-6 py-2 rounded-md"
          >
            View Verified Policies
          </button>
        </div>

        {/* Display All Policies */}
        {allPolicyData && allPolicyData.length > 0 && (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              All Policies
            </h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-b border-gray-300">Policy ID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Policy Holder</th>
                  <th className="px-4 py-2 border-b border-gray-300">Premium</th>
                  <th className="px-4 py-2 border-b border-gray-300">Coverage</th>
                  <th className="px-4 py-2 border-b border-gray-300">Start Date</th>
                  <th className="px-4 py-2 border-b border-gray-300">End Date</th>
                  <th className="px-4 py-2 border-b border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {allPolicyData.map((policy, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Key}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.policyHolder}</td>
                    <td className="px-4 py-2 border-b border-gray-300">${policy.Record.premiumAmount}</td>
                    <td className="px-4 py-2 border-b border-gray-300">${policy.Record.coverageAmount}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.startDate}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.endDate}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Display Verified Policies */}
        {verifiedPolicyData && verifiedPolicyData.length > 0 && (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              Verified Policies
            </h3>
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-b border-gray-300">Policy ID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Policy Holder</th>
                  <th className="px-4 py-2 border-b border-gray-300">Premium</th>
                  <th className="px-4 py-2 border-b border-gray-300">Coverage</th>
                  <th className="px-4 py-2 border-b border-gray-300">Start Date</th>
                  <th className="px-4 py-2 border-b border-gray-300">End Date</th>
                  <th className="px-4 py-2 border-b border-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {verifiedPolicyData.map((policy, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Key}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.policyHolder}</td>
                    <td className="px-4 py-2 border-b border-gray-300">${policy.Record.premiumAmount}</td>
                    <td className="px-4 py-2 border-b border-gray-300">${policy.Record.coverageAmount}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.startDate}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.endDate}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Fallback if no data */}
        {allPolicyData.length === 0 && verifiedPolicyData.length === 0 && (
          <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-4">
              No Policies Available
            </h3>
            <p className="text-gray-700">Please try fetching the policies again.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicyDashboard;
