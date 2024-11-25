import React, { useState } from 'react';

const SubmitMedicalReport = () => {
    const [reportId, setReportId] = useState('');
    const [policyId, setPolicyId] = useState('');
    const [billAmount, setBillAmount] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!reportId || !policyId || !billAmount || !diagnosis || !description || !date) {
            setError('All fields are required.');
            return;
        }

        const requestData = {
            reportId,
            policyId,
            billAmount,
            diagnosis,
            description,
            date,
        };

        // Clear any previous messages
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:5000/submitMedicalReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Medical report submitted successfully!');
            } else {
                setError(result.message || 'Failed to submit report');
            }
        } catch (err) {
            setError('Error submitting the report: ' + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Submit Medical Report</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600" htmlFor="reportId">Report ID:</label>
                        <input
                            id="reportId"
                            type="text"
                            value={reportId}
                            onChange={(e) => setReportId(e.target.value)}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600" htmlFor="policyId">Policy ID:</label>
                        <input
                            id="policyId"
                            type="text"
                            value={policyId}
                            onChange={(e) => setPolicyId(e.target.value)}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600" htmlFor="billAmount">Bill Amount:</label>
                        <input
                            id="billAmount"
                            type="number"
                            value={billAmount}
                            onChange={(e) => setBillAmount(e.target.value)}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600" htmlFor="diagnosis">Diagnosis:</label>
                        <input
                            id="diagnosis"
                            type="text"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600" htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600" htmlFor="date">Date of Report:</label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitMedicalReport;
