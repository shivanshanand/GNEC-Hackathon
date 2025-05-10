import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const AdminLogin = ({ setIsAdmin }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      navigate("/admin");
    } else {
      toast.error("Incorrect password. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
          Admin Login
        </h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-4 py-2 border rounded-md mb-4 text-sm sm:text-base"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Log in
        </button>

        <button
          onClick={handleBack}
          className="w-full mt-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
