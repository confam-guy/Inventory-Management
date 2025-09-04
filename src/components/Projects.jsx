import React from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../components/AuthContext';
import { motion } from 'framer-motion';
import { FiPlus, FiBriefcase } from 'react-icons/fi';

const Projects = () => {
  const { currentUser } = useAuth();

  const projectList = [
    { id: 1, title: 'Landing Page Redesign', client: 'Acme Inc.', budget: '$1,200', status: 'Ongoing' },
    { id: 2, title: 'Mobile App UI', client: 'Startly', budget: '$3,500', status: 'Completed' },
    { id: 3, title: 'Dashboard Revamp', client: 'Wave Tech', budget: '$2,000', status: 'Ongoing' },
    { id: 4, title: 'E-commerce Site', client: 'Shoply', budget: '$4,000', status: 'Pending' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-sans">
      <Sidebar currentUser={currentUser} />

      <main className="flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <FiPlus className="mr-2" />
            Add New
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectList.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: project.id * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
                <FiBriefcase className="text-blue-500 text-xl" />
              </div>
              <p className="text-gray-600 mb-2"><strong>Client:</strong> {project.client}</p>
              <p className="text-gray-600 mb-2"><strong>Budget:</strong> {project.budget}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  project.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : project.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {project.status}
              </span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
