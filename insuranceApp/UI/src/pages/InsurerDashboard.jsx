// // InsurerDashboard.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaFileContract, FaEye, FaTrash } from 'react-icons/fa';

// const InsurerDashboard = () => {
//   const navigate = useNavigate();

//   const handleCreatePolicy = () => {
//     navigate('/create-policy');
//   };

//   const handleReadPolicy = () => {
//     navigate('/getpolicy');
//   };

//   const handleDeletePolicy = () => {
//     navigate('/delete-policy');  // Navigate to the Delete Policy page
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900">
//       <div className="p-12 bg-white bg-opacity-90 rounded-lg shadow-xl text-center w-full max-w-4xl">
//         <h2 className="text-5xl font-bold mb-12 text-blue-800">Insurer Dashboard</h2>
        
//         <div className="flex items-center justify-center gap-16">
//           <div className="flex flex-col items-center space-y-4">
//             <FaFileContract className="text-8xl text-blue-600 mb-4" />
//             <button
//               onClick={handleCreatePolicy}
//               className="px-10 py-4 bg-blue-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
//             >
//               Create Policy
//             </button>
//           </div>

//           <div className="flex flex-col items-center space-y-4">
//             <FaEye className="text-8xl text-green-600 mb-4" />
//             <button
//               onClick={handleReadPolicy}
//               className="px-10 py-4 bg-green-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-green-600 transition"
//             >
//               Read Policy
//             </button>
//           </div>

//           <div className="flex flex-col items-center space-y-4">
//             <FaTrash className="text-8xl text-red-600 mb-4" />
//             <button
//               onClick={handleDeletePolicy}
//               className="px-10 py-4 bg-red-600 text-white text-xl font-medium rounded-lg shadow-md hover:bg-red-700 transition"
//             >
//               Delete Policy
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InsurerDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileContract, FaEye, FaTrash, FaCheckCircle } from 'react-icons/fa';

const InsurerDashboard = () => {
  const navigate = useNavigate();

  const handleCreatePolicy = () => {
    navigate('/create-policy');
  };

  const handleReadPolicy = () => {
    navigate('/getpolicy');
  };

  const handleDeletePolicy = () => {
    navigate('/delete-policy');
  };

  const handleApprovePolicy = () => {
    navigate('/approve'); // Navigate to the Approve Policy page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900">
      <div className="p-12 bg-white bg-opacity-90 rounded-lg shadow-xl text-center w-full max-w-4xl">
        <h2 className="text-5xl font-bold mb-12 text-blue-800">Insurer Dashboard</h2>

        <div className="flex items-center justify-center gap-16 flex-wrap">
          {/* Create Policy */}
          <div className="flex flex-col items-center space-y-4">
            <FaFileContract className="text-8xl text-blue-600 mb-4" />
            <button
              onClick={handleCreatePolicy}
              className="px-10 py-4 bg-blue-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Create Policy
            </button>
          </div>

          {/* Read Policy */}
          <div className="flex flex-col items-center space-y-4">
            <FaEye className="text-8xl text-green-600 mb-4" />
            <button
              onClick={handleReadPolicy}
              className="px-10 py-4 bg-green-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Read Policy
            </button>
          </div>

          {/* Delete Policy */}
          <div className="flex flex-col items-center space-y-4">
            <FaTrash className="text-8xl text-red-600 mb-4" />
            <button
              onClick={handleDeletePolicy}
              className="px-10 py-4 bg-red-600 text-white text-xl font-medium rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Delete Policy
            </button>
          </div>

          {/* Approve Policy */}
          <div className="flex flex-col items-center space-y-4">
            <FaCheckCircle className="text-8xl text-purple-600 mb-4" />
            <button
              onClick={handleApprovePolicy}
              className="px-10 py-4 bg-purple-500 text-white text-xl font-medium rounded-lg shadow-md hover:bg-purple-600 transition"
            >
              Approve Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurerDashboard;
