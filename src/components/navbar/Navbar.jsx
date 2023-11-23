import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
  // Example click handler function
  const handleClick = (event) => {
    console.log("Icon clicked!", event.currentTarget);
    // You can add your logic here, for example, navigation or opening a modal
  };

  return (
    <div className="bg-white shadow h-12 flex items-center justify-between px-4 md:px-6 border-b border-gray-200">
      {/* Empty div for balancing flex */}
      <div></div>

      <div className="flex-1 flex items-center justify-center">
        <span className="text-lg text-gray-700 font-semibold">
          Healthcare Management System
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => handleClick("language")}
          className="flex items-center space-x-1 focus:outline-none"
        >
          <LanguageOutlinedIcon className="text-gray-600 text-base cursor-pointer" />
          <span className="text-sm text-gray-600">English</span>
        </button>
        <button
          onClick={() => handleClick("notifications")}
          className="focus:outline-none"
        >
          <NotificationsNoneOutlinedIcon className="text-gray-600 text-base cursor-pointer" />
        </button>
        <button
          onClick={() => handleClick("list")}
          className="focus:outline-none"
        >
          <ListOutlinedIcon className="text-gray-600 text-base cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
