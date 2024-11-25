import React, { useState } from "react";

const ReadMedicalReport = () => {
  const [reportId, setReportId] = useState("");
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReadReport = async () => {
    if (!reportId) {
      setError("Report ID is required.");
      return;
    }

    setError("");
    setReportData(null);
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/readMedicalReport?reportId=${reportId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        setError(result.message || "Failed to fetch the report.");
      } else {
        const data = await response.json();
        setReportData(data);
      }
    } catch (err) {
      setError("Error fetching the report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Read Medical Report
        </h1>
        <div className="mb-4">
          <label
            htmlFor="reportId"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Report ID
          </label>
          <input
            type="text"
            id="reportId"
            placeholder="Enter Report ID"
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 mb-4">
            {error}
          </p>
        )}
        <button
          onClick={handleReadReport}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={loading}
        >
          {loading ? "Fetching Report..." : "Read Report"}
        </button>
        {reportData && (
          <div className="mt-6">
            <h2 className="text-lg font-bold text-gray-700 mb-2">
              Medical Report Details
            </h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm text-gray-800">
              {JSON.stringify(reportData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadMedicalReport;
