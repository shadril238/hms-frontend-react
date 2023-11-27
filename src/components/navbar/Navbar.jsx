import React, { useState, useEffect } from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import axiosInstancePatientService from "../../utils/axiosInstancePatientService";
import axiosInstanceNotificationService from "../../utils/axiosInstanceNotificationService";

const Navbar = () => {
  const [showSlider, setShowSlider] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstancePatientService.get("/profile");
      setUserId(response.data.userId);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Fetch all notifications
  const fetchAllNotifications = async () => {
    if (!userId) return;
    try {
      const response = await axiosInstanceNotificationService.get(`/${userId}`);
      setAllNotifications(response.data);
    } catch (error) {
      console.error("Error fetching all notifications:", error);
    }
  };

  const fetchNotifications = async () => {
    if (!userId) return;
    try {
      const response = await axiosInstanceNotificationService.get(
        `/unread/${userId}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!userId) return;
    try {
      await axiosInstanceNotificationService.post(`/mark-all-read/${userId}`);
      fetchNotifications(); // Refresh notifications
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleClick = (type) => {
    console.log("Icon clicked!", type);

    if (type === "notifications") {
      setShowSlider(!showSlider);

      if (!showSlider) {
        fetchNotifications();
        setShowAllNotifications(false);
      }
    }
  };

  const handleViewAllNotifications = () => {
    fetchAllNotifications().then(() => {
      setShowAllNotifications(!showAllNotifications);
      setShowSlider(false);
    });
  };

  const NotificationSlider = () => {
    return (
      <div
        className={`absolute right-0 top-12 bg-white shadow-xl p-4 w-80 rounded-lg overflow-y-auto max-h-[400px] border border-gray-200 ${
          showSlider ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
          <div className="flex space-x-2">
            <button
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              onClick={markAllAsRead}
            >
              Mark all as read
            </button>
            <button
              onClick={handleViewAllNotifications}
              className="text-sm text-green-600 hover:text-green-800 font-medium"
            >
              View all
            </button>
          </div>
        </div>
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 p-3 border-b border-gray-200 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
            >
              <p className="text-sm font-semibold text-gray-800">
                {notification.notificationType}
              </p>
              <p className="text-sm text-gray-600">
                {notification.notificationText}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">
            No unread notifications
          </p>
        )}
      </div>
    );
  };

  const AllNotificationsView = () => {
    return (
      <div
        className={`absolute right-0 top-12 bg-white shadow-xl p-4 w-80 rounded-lg overflow-y-auto max-h-[400px] border border-gray-200 ${
          showAllNotifications ? "block" : "hidden"
        } transition-transform duration-300 ease-in-out z-10`}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          All Notifications
        </h2>
        {allNotifications.length > 0 ? (
          allNotifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 p-3 border-b border-gray-200 hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
            >
              <p className="text-sm font-semibold text-gray-800">
                {notification.notificationType}
              </p>
              <p className="text-sm text-gray-600">
                {notification.notificationText}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">No notifications</p>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white shadow h-12 flex items-center justify-between px-4 md:px-6 border-b border-gray-200">
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
      <NotificationSlider />
      <AllNotificationsView />
    </div>
  );
};

export default Navbar;
