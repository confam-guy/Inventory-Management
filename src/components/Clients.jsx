import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from './AuthContext';
import Sidebar from './Sidebar';
import { FiUser } from 'react-icons/fi';

const dummyClients = [
  { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2025-04-10' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2025-05-12' },
  { id: 3, name: 'Ali Hassan', email: 'ali@example.com', joined: '2025-06-01' },
  { id: 4, name: 'Mariam Yusuf', email: 'mariam@example.com', joined: '2025-06-15' },
  { id: 5, name: 'Blessing Obi', email: 'blessing@example.com', joined: '2025-07-01' },
];

const Clients = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      <Sidebar currentUser={currentUser} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Clients</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">#</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-2 px-4 text-sm font-semibold text-gray-700">Joined</th>
                </tr>
              </thead>
              <tbody>
                {dummyClients.map((client, index) => (
                  <tr key={client.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="py-2 px-4 text-sm text-gray-800 flex items-center gap-2">
                      <FiUser className="text-blue-500" />
                      {client.name}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-600">{client.email}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">{client.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Clients;
