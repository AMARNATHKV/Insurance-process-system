import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const QueryAllPolicies = () => {
  const [policyData, setPolicyData] = useState([]);

  useEffect(() => {
    const fetchPolicyData = async () => {
      try {
        const res = await fetch("http://localhost:5000/queryallpolicies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        console.log("Backend Response:", result); // Log for debugging

        if (result.success && result.data.value) {
          setPolicyData(result.data.value); // Save policies to state
          toast.success("Policies retrieved successfully");
        } else {
          toast.error("No policies found");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("An error occurred while fetching the policies");
      }
    };

    fetchPolicyData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-teal-400 to-blue-300 min-h-screen flex items-center justify-center p-6">
      <div className="bg-transparent p-8 rounded-lg max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Policy Dashboard
        </h2>

        {policyData && policyData.length > 0 ? (
          <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              Policy Data
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
                  <th className="px-4 py-2 border-b border-gray-300">Status</th> {/* Added Status Column */}
                </tr>
              </thead>
              <tbody>
                {policyData.map((policy, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Key}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.policyHolder}</td>
                    <td className="px-4 py-2 border-b border-gray-300">${policy.Record.premiumAmount}</td>
                    <td className="px-4 py-2 border-b border-gray-300">${policy.Record.coverageAmount}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.startDate}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.endDate}</td>
                    <td className="px-4 py-2 border-b border-gray-300">{policy.Record.status}</td> {/* Display the Status */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6 p-6 bg-red-50 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-4">No Policy Data Found</h3>
            <p className="text-gray-700">
              There is no policy data available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryAllPolicies;
