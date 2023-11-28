import React from "react";
import { Link } from "react-router-dom";

const OpenNavbar = () => {
  return (
    <div className="bg-white shadow h-12 flex items-center justify-between px-4 md:px-6 border-b border-gray-200">
      {/* Empty div to balance the flex layout */}
      <div></div>

      {/* <div className="flex-1 flex items-center justify-center">
        <span className="text-lg text-gray-700 font-semibold">HMS</span>
      </div> */}

      {/* Navigation Links */}
      <div className="flex items-center justify-end space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-gray-900">
          Login
        </Link>
        <Link
          to="/patient/register"
          className="text-gray-700 hover:text-gray-900"
        >
          Patient Registration
        </Link>
        <Link
          to="/doctor/register"
          className="text-gray-700 hover:text-gray-900"
        >
          Doctor Registration
        </Link>
      </div>
    </div>
  );
};

export default OpenNavbar;
