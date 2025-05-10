import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Home */}
        <Link to="/" className="text-xl font-bold">
          SafeSpace
        </Link>

        {/* Right-side links */}
        <div className="flex items-center space-x-4">
          <Link
            to="/admin-login"
            className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
