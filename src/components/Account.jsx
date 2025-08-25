import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { useAuth } from './AuthContext';

const Account = () => {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'user',
    email: currentUser?.email || 'johndoe@example.com',
    phone: currentUser?.phone || '',
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Updated Profile:', formData);
    alert('Profile updated (mock)');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Changed Password:', formData);
    alert('Password changed (mock)');
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen font-sans">
      <Sidebar currentUser={currentUser} />

      <div className="flex-1 p-4 sm:p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>

        {/* Profile Info */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
          <form onSubmit={handleUpdateProfile} className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-2 hover:bg-blue-700"
            >
              Update Profile
            </button>
          </form>
        </motion.div>

        {/* Change Password */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded-lg mt-2 hover:bg-green-700"
            >
              Change Password
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Account;
