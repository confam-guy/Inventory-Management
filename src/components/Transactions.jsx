import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { useAuth } from './AuthContext';
import { FiSearch, FiArrowDown, FiArrowUp } from 'react-icons/fi';

const transactions = [
  {
    id: 1,
    name: 'Client Payment',
    date: '2025-07-31',
    type: 'income',
    amount: 350.00,
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Project Expense',
    date: '2025-07-30',
    type: 'expense',
    amount: 120.50,
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Service Fee',
    date: '2025-07-28',
    type: 'expense',
    amount: 50.00,
    status: 'Completed',
  },
  {
    id: 4,
    name: 'Client Refund',
    date: '2025-07-27',
    type: 'expense',
    amount: 75.00,
    status: 'Declined',
  },
  {
    id: 5,
    name: 'Income from Design',
    date: '2025-07-26',
    type: 'income',
    amount: 500.00,
    status: 'Completed',
  },
];

const Transaction = () => {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen font-sans">
      <Sidebar currentUser={currentUser} />

      <div className="flex-1 p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Table Section */}
        <motion.div
          className="bg-white p-4 rounded-xl shadow-md overflow-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <table className="min-w-full table-auto text-left text-sm">
            <thead className="text-gray-600 uppercase border-b">
              <tr>
                <th className="py-3 px-4">Transaction</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{txn.name}</td>
                  <td className="py-3 px-4 text-gray-600">{txn.date}</td>
                  <td className="py-3 px-4 text-gray-600 capitalize">
                    {txn.type === 'income' ? (
                      <span className="inline-flex items-center text-green-600">
                        <FiArrowDown className="mr-1" /> Income
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600">
                        <FiArrowUp className="mr-1" /> Expense
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-semibold">
                    ${txn.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        txn.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : txn.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Transaction;
