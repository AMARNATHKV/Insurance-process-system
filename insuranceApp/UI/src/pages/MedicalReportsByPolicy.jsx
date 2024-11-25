import React, { useState } from "react";

const GetMedicalReports = () => {
  const [policyId, setPolicyId] = useState("");
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!policyId) {
      setError("Policy ID is required.");
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before making the request

    try {
      const response = await fetch(`http://localhost:5000/getMedicalReportsByPolicy?policyId=${policyId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medical reports");
      }

      const data = await response.json();
      setReports(data);
    } catch (error) {
      setError(error.message);
      setReports(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Get Medical Reports by Policy ID</h1>

      <input
        type="text"
        id="policyId"
        value={policyId}
        onChange={(e) => setPolicyId(e.target.value)}
        placeholder="Enter Policy ID"
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        {loading ? "Loading..." : "Get Reports"}
      </button>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {reports && (
        <div className="mt-4 bg-gray-100 p-4 rounded border">
          <h2 className="text-xl font-medium mb-2">Medical Reports:</h2>
          <pre className="text-sm">{JSON.stringify(reports, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetMedicalReports;
