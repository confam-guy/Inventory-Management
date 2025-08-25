import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      label: 'Inventory Tracking:',
      description: 'Monitor stock levels, locations, and movements instantly.'
    },
    {
      label: 'Clients:',
      description: 'Manage client information and interactions.'
    },
    {
      label: 'Project:',
      description: 'Manage project details, assign team members, set deadlines, and track progress.'
    },
    {
      label: 'Transactions:',
      description: 'Manage all transactions, including sales and purchases, with detailed records and reporting.'
    },
    {
      label: 'Account:',
      description: 'Manage user accounts, including profile information, roles, and permissions.'
    },
    {
      label: 'Withdraw Money:',
      description: 'Lets you withdraw funds from your account easily and securely.'
    },
    {
      label: 'Reminder:',
      description: 'Set reminders for important tasks and deadlines to stay organized.'
    },
     {
      label: 'Privacy & Settings:',
      description: 'Manage your privacy preferences and application settings for a personalized experience.'
    },
    {
      label: 'User-Friendly Interface:',
      description: 'Intuitive design ensures ease of use for all functionalities.'
    },
    {
      label: 'Responsive Design:',
      description: 'Access and manage your inventory from any device, anywhere.'
    },
  ];

  return (
    <motion.div
      className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto my-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-4xl font-bold text-gray-800 mb-6 border-b-4 border-blue-500 pb-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        Key Features
      </motion.h2>
      <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
        {features.map((feature, index) => (
          <motion.li
            key={feature.label}
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <span className="font-semibold text-blue-600">{feature.label}</span> {feature.description}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Features;
