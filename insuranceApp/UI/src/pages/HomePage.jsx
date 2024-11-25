import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to LoginPage where the organization icons are shown
    navigate('/login');
  };

  return (
    <div
      className="flex items-center justify-start h-screen bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/src/assets/images/insurance.jpg')" }}
    >
      <div className="text-left">
        <h1 className="text-4xl font-bold mb-4">Insurance Process System</h1>
        <p className="text-lg mb-8 max-w-lg">
          Streamline your insurance claims with a decentralized solution that provides transparency, efficiency, and fraud prevention across all stakeholders.
        </p>

        <button
          onClick={handleLogin}
          className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;
