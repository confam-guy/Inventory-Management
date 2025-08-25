// src/components/SidebarLayout.jsx
import React, { useState, useEffect } from "react";
import { FiBox } from "react-icons/fi";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

const SidebarLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (!large) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mr-auto relative">
      {/* Inventory Button */}
      <div className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={toggleSidebar}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isSidebarOpen ? 360 : 0 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-2 bg-gradient-to-r ${
            isSidebarOpen
              ? "from-pink-500 via-purple-500 to-blue-500"
              : "from-blue-500 via-purple-500 to-pink-500"
          } px-4 py-2 rounded-full shadow-lg text-white font-bold transition-all duration-500`}
        >
          <FiBox className="w-6 h-6" />
          <span className="hidden sm:inline-block">Inventory</span>
        </motion.button>
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={setIsSidebarOpen} // Pass correct setter
      />

      {/* Dashboard Content */}
      <div
        className={`flex-1 min-h-screen transition-all duration-500 p-6 ${
          isSidebarOpen && isLargeScreen ? "ml-64" : "ml-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
