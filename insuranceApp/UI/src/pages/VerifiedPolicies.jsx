import React, { useState, useEffect } from "react";

const VerifiedPolicies = () => {
  const [policyId, setPolicyId] = useState("");
  const [policies, setPolicies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch("http://localhost:5000/queryVerifiedPolicies", {
          method: "GET", // Specify GET method
          headers: {
            "Content-Type": "application/json", // Optional, specify if the server expects JSON
          },
        });
        const data = await res.json();
        setPolicies(data.data || []);
      } catch (error) {
        console.error("Error fetching verified policies:", error);
      }
    };
  
    fetchPolicies();
  }, []);
  

  const handleApprove = async () => {
    if (!policyId) {
      setError("Policy ID is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/approvePolicy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policyId }),
      });
      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        setPolicies((prev) => prev.filter((policy) => policy.Key !== policyId));
        setPolicyId(""); // Clear input field
      } else {
        setError(result.message || "Failed to approve policy.");
      }
    } catch (error) {
      setError("Error approving the policy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Verified Policies
        </h1>

        <div className="mb-4">
          <label
            htmlFor="policyId"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Policy ID
          </label>
          <input
            type="text"
            id="policyId"
            placeholder="Enter Policy ID"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleApprove}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {loading ? "Approving..." : "Approve Policy"}
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            Verified Policy List
          </h2>
          <ul className="bg-gray-100 p-4 rounded-md overflow-y-auto max-h-64">
            {policies.map((policy) => (
              <li
                key={policy.Key}
                className="flex justify-between items-center py-2 border-b"
              >
                <span>
                  <strong>ID:</strong> {policy.Key} |{" "}
                  <strong>Holder:</strong> {policy.policyHolder} |{" "}
                  <strong>Status:</strong> {policy.status}
                </span>
                <button
                  className="text-sm bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                  onClick={() => setPolicyId(policy.Key)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VerifiedPolicies;
