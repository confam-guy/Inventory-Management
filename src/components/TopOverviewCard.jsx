import React from 'react'
import { motion } from 'framer-motion';

const TopOverviewCard = ({ title, value, change, type }) => {
  const isIncrease = type === 'increase';
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 my-2">{value}</p>
      <p className={`text-sm ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
        {isIncrease ? '▲' : '▼'} {change}
      </p>
    </motion.div>
  );
};

export default TopOverviewCard;