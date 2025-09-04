// src/components/Sidebar.jsx
import React from "react";
import {
  FiHome,
  FiUsers,
  FiBriefcase,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const menuItems = [
    { to: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    { to: "/clients", icon: <FiUsers />, label: "Clients" },
    { to: "/projects", icon: <FiBriefcase />, label: "Projects" },
    { to: "/transactions", icon: <FiCreditCard />, label: "Transactions" },
    { to: "/account", icon: <FiUser />, label: "Account" },
    { to: "/withdraw", icon: <MdAttachMoney />, label: "Withdraw Money" },
    { to: "/reminders", icon: <FiBell />, label: "Reminders" },
    { to: "/settings", icon: <FiSettings />, label: "Settings" },
  ];

  // Sidebar container animation
  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.08, // staggered menu reveal
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Each menu item animation
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          key="sidebar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={sidebarVariants}
          className="fixed top-0 left-0 w-64 h-screen 
            bg-white/20 text-amber-300 backdrop-blur-xl shadow-xl 
            border-r border-white/30 rounded-r-2xl z-50 flex flex-col"
        >
          {/* === SIDEBAR HEADER === */}
          <div className="p-5 border-b border-white/30 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-md flex items-center justify-between rounded-tr-2xl">
            <h1 className="text-lg font-bold text-white tracking-wide drop-shadow">
              Inventory
            </h1>
            <button
              onClick={() => toggleSidebar(false)}
              className="lg:hidden p-2 rounded-full hover:bg-white/20 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="white"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* === SIDEBAR MENU === */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            <ul className="space-y-3">
              {menuItems.map(({ to, icon, label }) => (
                <motion.li
                  key={to}
                  variants={menuItemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <NavLink
                    to={to}
                    onClick={() => toggleSidebar(false)} // Auto-close on mobile
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md"
                          : "bg-white/10 hover:bg-white/20 text-gray-200"
                      }`
                    }
                  >
                    <span className="text-xl text-black">{icon}</span>
                    <span className="text-sm font-medium text-black">{label}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* === LOGOUT BUTTON === */}
          <div className="p-4 border-t border-white/20">
            <motion.button
              onClick={() => {
                localStorage.removeItem("userToken");
                window.location.href = "/login";
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#ef4444",
                boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-3 justify-center bg-red-500/80 text-white py-2 rounded-xl shadow-lg transition"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
