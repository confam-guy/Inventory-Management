// src/components/DashboardNav.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiChevronDown, FiSettings, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "./NotificationContext";
import { useNavigate } from "react-router-dom";

const DashboardNav = ({ currentUser, clients = [], onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const { hasNewReminders } = useNotification();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search filter
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredClients([]);
    } else {
      const results = clients.filter((client) =>
        client.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredClients(results);
    }
    if (onSearch) onSearch(value);
  };

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      // Removed fixed white background → Now inherits dashboard background
      className="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-4 bg-inherit relative"
    >
      {/* LEFT SECTION — USER GREETING */}
      <div className="flex items-center gap-3">
        {/* Animated waving hand */}
        <motion.span
          animate={{ rotate: [0, 15, -10, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl"
        >
          👋
        </motion.span>
        <div>
          <p className="text-base font-semibold text-gray-800">
            Hello, {currentUser?.name || "Guest"}
          </p>
          <div className="flex items-center gap-2">
            {/* Animated green dot */}
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2.5 h-2.5 bg-green-500 rounded-full"
            ></motion.span>
            {/* Fading ONLINE text */}
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xs text-gray-500"
            >
              Online
            </motion.p>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center space-x-3 sm:space-x-4 relative">
        {/* SEARCH BAR */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1 relative">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="bg-transparent focus:outline-none px-2 text-sm w-28 md:w-40"
          />
          {filteredClients.length > 0 && (
            <div className="absolute top-10 left-0 w-full bg-white shadow-md rounded-lg max-h-40 overflow-y-auto z-50">
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSearchTerm("");
                    setFilteredClients([]);
                    navigate(`/clients/${client.id}`);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                >
                  {client.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <motion.button
          whileTap={{
            scale: 0.9,
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 0.5 },
          }}
          onClick={() => {
            setTimeout(() => navigate("/reminders"), 200);
          }}
          className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        >
          <FiBell className="text-gray-600" size={18} />
          {hasNewReminders && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </motion.button>

        {/* PROFILE SECTION */}
        <div ref={menuRef} className="relative">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          >
            <img
              src={
                currentUser?.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser?.email || "Guest"}`
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-semibold">{currentUser?.name || "Guest"}</p>
              <p className="text-xs text-gray-500">
                {currentUser?.role || "User"}
              </p>
            </div>
            <motion.div
              animate={{ rotate: showMenu ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown className="text-gray-500" size={16} />
            </motion.div>
          </motion.div>

          {/* PROFILE DROPDOWN MENU */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg z-50 border"
              >
                <button
                  onClick={() => navigate("/account")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
                >
                  <FiUser size={16} /> View Profile
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
                >
                  <FiSettings size={16} /> Settings
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardNav;
