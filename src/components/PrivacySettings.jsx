import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../Components/AuthContext';
import { motion } from 'framer-motion';

const PrivacySettings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    showEmail: true,
    showProfile: true,
    shareActivity: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen font-sans">
      <Sidebar currentUser={currentUser} />

      <div className="flex-1 p-4 sm:p-6">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Privacy Settings</h1>

          <div className="space-y-6">
            {/* Toggle email visibility */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-700">Show Email</p>
                <p className="text-sm text-gray-500">Allow others to see your email address</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle('showEmail')}
                  className="sr-only"
                />
                <span
                  className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                    settings.showEmail ? 'bg-blue-600' : ''
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ease-in-out ${
                      settings.showEmail ? 'translate-x-5' : ''
                    }`}
                  />
                </span>
              </label>
            </div>

            {/* Toggle profile visibility */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-700">Public Profile</p>
                <p className="text-sm text-gray-500">Allow your profile to be visible to everyone</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showProfile}
                  onChange={() => handleToggle('showProfile')}
                  className="sr-only"
                />
                <span
                  className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                    settings.showProfile ? 'bg-blue-600' : ''
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ease-in-out ${
                      settings.showProfile ? 'translate-x-5' : ''
                    }`}
                  />
                </span>
              </label>
            </div>

            {/* Toggle activity sharing */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-700">Share Activity</p>
                <p className="text-sm text-gray-500">Allow others to see your recent activity</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.shareActivity}
                  onChange={() => handleToggle('shareActivity')}
                  className="sr-only"
                />
                <span
                  className={`w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                    settings.shareActivity ? 'bg-blue-600' : ''
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ease-in-out ${
                      settings.shareActivity ? 'translate-x-5' : ''
                    }`}
                  />
                </span>
              </label>
            </div>
          </div>

          <button className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
            Save Changes
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacySettings;
