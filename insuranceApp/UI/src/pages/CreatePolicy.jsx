import React, { useState } from "react";
import { toast ,ToastContainer } from "react-toastify";

const CreatePolicy = () => {
  const [policyId, setPolicyId] = useState("");
  const [policyHolder, setPolicyHolder] = useState("");
  const [coverageAmount, setCoverageAmount] = useState("");
  const [premium, setPremium] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handles form submission
  const submitForm = (e) => {
    e.preventDefault();

    // Create new policy object with form data
    const newPolicy = {
      policyId,
      policyHolder,
      coverageAmount,
      premiumAmount: premium, // Added premium amount
      startDate,
      endDate
    };

    // Call the function to add the policy
    addPolicy(newPolicy);
  };

  // Function to handle adding the policy via an API call
  const addPolicy = async (newPolicy) => {
    try {
      const res = await fetch("http://localhost:5000/createpolicy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPolicy),
      });

      const result = await res.json();

      // Success or error handling
      if (result.success) {
        toast.success("Policy created successfully!");
        // Reset form fields after successful submission
        setPolicyId("");
        setPolicyHolder("");
        setCoverageAmount("");
        setPremium("");
        setStartDate("");
        setEndDate("");
      } else {
        toast.error(result.message || "Failed to create policy.");
      }
    } catch (error) {
      toast.error("Error: Unable to create policy entry.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-800">
          Create Insurance Policy
        </h2>
        <form onSubmit={submitForm} className="space-y-4">
          {/* Policy ID Input */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Policy ID</label>
            <input
              type="text"
              id="policyId"
              name="policyId"
              className="w-full border-none bg-blue-50 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-100 transition"
              placeholder="e.g., Policy-001"
              required
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
            />
          </div>

          {/* Policy Holder Input */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Policy Holder</label>
            <input
              type="text"
              id="policyHolder"
              name="policyHolder"
              className="w-full border-none bg-blue-50 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-100 transition"
              placeholder="e.g., John Doe"
              required
              value={policyHolder}
              onChange={(e) => setPolicyHolder(e.target.value)}
            />
          </div>

          {/* Coverage Amount Input */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Coverage Amount</label>
            <input
              type="number"
              id="coverageAmount"
              name="coverageAmount"
              className="w-full border-none bg-blue-50 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-100 transition"
              placeholder="Enter Coverage Amount"
              required
              value={coverageAmount}
              onChange={(e) => setCoverageAmount(e.target.value)}
            />
          </div>

          {/* Premium Input */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Premium</label>
            <input
              type="number"
              id="premium"
              name="premium"
              className="w-full border-none bg-blue-50 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-100 transition"
              placeholder="Enter Premium Amount"
              required
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
            />
          </div>

          {/* Start Date Input */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="w-full border-none bg-blue-50 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-100 transition"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date Input */}
          <div>
            <label className="block text-blue-900 font-semibold mb-1">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="w-full border-none bg-blue-50 rounded-lg py-2 px-4 focus:outline-none focus:bg-blue-100 transition"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition focus:outline-none"
          >
            Create Policy
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePolicy;