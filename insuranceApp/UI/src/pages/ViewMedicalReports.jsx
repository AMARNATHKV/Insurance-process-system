// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const ViewAllMedicalReports = () => {
//   const [medicalReports, setMedicalReports] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchMedicalReports = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("http://localhost:5000/viewAllMedicalReports", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const result = await response.json();
//         console.log("Medical Reports Response:", result); // Log response for debugging

//         if (result.success && result.data) {
//           setMedicalReports(result.data);
//           toast.success("Medical reports retrieved successfully!");
//         } else {
//           toast.error("Failed to retrieve medical reports.");
//         }
//       } catch (error) {
//         console.error("Error fetching medical reports:", error);
//         toast.error("An error occurred while retrieving medical reports.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMedicalReports();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-400 flex items-center justify-center p-6">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
//         <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           Medical Reports Dashboard
//         </h2>

//         {loading ? (
//           <div className="text-center text-lg text-purple-700">
//             Loading medical reports...
//           </div>
//         ) : medicalReports.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-4 py-2 border-b">Report ID</th>
//                   <th className="px-4 py-2 border-b">Patient Name</th>
//                   <th className="px-4 py-2 border-b">Doctor Name</th>
//                   <th className="px-4 py-2 border-b">Diagnosis</th>
//                   <th className="px-4 py-2 border-b">Date</th>
//                   <th className="px-4 py-2 border-b">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {medicalReports.map((report, index) => (
//                   <tr key={index} className="bg-white">
//                     <td className="px-4 py-2 border-b">{report.Key}</td>
//                     <td className="px-4 py-2 border-b">{report.Record.patientName}</td>
//                     <td className="px-4 py-2 border-b">{report.Record.doctorName}</td>
//                     <td className="px-4 py-2 border-b">{report.Record.diagnosis}</td>
//                     <td className="px-4 py-2 border-b">{report.Record.date}</td>
//                     <td className="px-4 py-2 border-b">{report.Record.details}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center text-lg text-red-700">
//             No medical reports found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ViewAllMedicalReports;


import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ViewAllMedicalReports = () => {
  const [medicalReports, setMedicalReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicalReports = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/viewAllMedicalReports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        console.log("Medical Reports Response:", result); // Log response for debugging

        if (result.success && result.data) {
          setMedicalReports(result.data);
          toast.success("Medical reports retrieved successfully!");
        } else {
          toast.error("Failed to retrieve medical reports.");
        }
      } catch (error) {
        console.error("Error fetching medical reports:", error);
        toast.error("An error occurred while retrieving medical reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-400 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Medical Reports Dashboard
        </h2>

        {loading ? (
          <div className="text-center text-lg text-purple-700">
            Loading medical reports...
          </div>
        ) : medicalReports.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border-b">Report ID</th>
                  <th className="px-4 py-2 border-b">Patient Name</th>
                  <th className="px-4 py-2 border-b">Doctor Name</th>
                  <th className="px-4 py-2 border-b">Diagnosis</th>
                  <th className="px-4 py-2 border-b">Date</th>
                  <th className="px-4 py-2 border-b">Details</th>
                </tr>
              </thead>
              <tbody>
                {medicalReports.map((report, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-2 border-b">{report.Key}</td>
                    <td className="px-4 py-2 border-b">{report.Record.patientName}</td>
                    <td className="px-4 py-2 border-b">{report.Record.doctorName}</td>
                    <td className="px-4 py-2 border-b">{report.Record.diagnosis}</td>
                    <td className="px-4 py-2 border-b">{report.Record.date}</td>
                    <td className="px-4 py-2 border-b">{report.Record.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-lg text-red-700">
            No medical reports found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllMedicalReports;
