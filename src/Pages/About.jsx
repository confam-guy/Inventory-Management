import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const renderIntro = () => (
    <motion.p
      className="text-lg text-gray-700 leading-relaxed mb-4"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      InvTrack is designed to revolutionize inventory management by providing a seamless, intuitive platform for tracking, analyzing, and optimizing your work. Our solution simplifies complex inventory processes, making it easy for teams to stay organized and responsive in a fast-paced business environment.
    </motion.p>
  );

  const renderMission = () => (
    <motion.p
      className="text-lg text-gray-700 leading-relaxed mb-4"
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
     It allows businesses to manage client relationships, oversee projects with allocated inventory and budgets, record and track all sales and purchase transactions, maintain user accounts with role-based access, handle fund withdrawals securely, set reminders for important tasks or deadlines, and configure privacy, security, and system settings — all aimed at streamlining operations, improving accuracy, and enhancing overall efficiency..
    </motion.p>
  );

  const renderConclusion = () => (
    <motion.p
      className="text-lg text-gray-700 leading-relaxed"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      From small startups to large enterprises, InvTrack provides the tools needed to make informed decisions, reduce costs, and enhance customer satisfaction through efficient inventory control.
    </motion.p>
  );

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
        About InvTrack
      </motion.h2>
      {renderIntro()}
      {renderMission()}
      {renderConclusion()}
    </motion.div>
  );
};

export default About;
