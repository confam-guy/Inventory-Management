import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../Components/AuthContext';
import TopOverviewCard from '../components/TopOverviewCard';
import ProjectCard from '../components/ProjectCard';
import WithdrawalCardOption from '../components/WithdrawalCardOption';
import DashboardNav from "../components/DashboardNav";
import { FiUsers, FiBriefcase } from 'react-icons/fi';

const DashboardHomePage = () => {
  const { currentUser } = useAuth();

  const chartData = [
    { name: 'Jan', customers: 100, projects: 50, income: 200 },
    { name: 'Feb', customers: 120, projects: 60, income: 220 },
    { name: 'Mar', customers: 150, projects: 70, income: 250 },
    { name: 'Apr', customers: 130, projects: 65, income: 230 },
    { name: 'May', customers: 180, projects: 80, income: 280 },
    { name: 'Jun', customers: 160, projects: 75, income: 260 },
    { name: 'Jul', customers: 190, projects: 85, income: 300 },
    { name: 'Aug', customers: 200, projects: 90, income: 320 },
    { name: 'Sep', customers: 170, projects: 80, income: 290 },
    { name: 'Oct', customers: 210, projects: 95, income: 330 },
    { name: 'Nov', customers: 180, projects: 88, income: 310 },
    { name: 'Dec', customers: 220, projects: 100, income: 350 },
  ];

  const todayProjects = [
    { id: 1, logo: 'https://placehold.co/40x40/FF5733/FFFFFF?text=B', name: 'Beats logo design', designer: 'Ali Hasanov', amount: 425 },
    { id: 2, logo: 'https://placehold.co/40x40/33A4FF/FFFFFF?text=W', name: 'Web design', designer: 'Yusif Ibrahimov', amount: 375 },
    { id: 3, logo: 'https://placehold.co/40x40/C70039/FFFFFF?text=M', name: 'Mobile app design', designer: 'Layla Mamedova', amount: 750 },
    { id: 4, logo: 'https://placehold.co/40x40/FFC300/000000?text=E', name: 'E-commerce design', designer: 'Ahmed Aliyev', amount: 585 },
    { id: 5, logo: 'https://placehold.co/40x40/DAF7A6/000000?text=R', name: 'Responsive design', designer: 'Yusif Mamedov', amount: 350 },
  ];

  const withdrawalCards = [
    { id: 1, type: 'Visa Card', lastDigits: '9147', selected: true, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png' },
    { id: 2, type: 'Master Card', lastDigits: '8947', selected: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png' },
    { id: 3, type: 'Visa Card', lastDigits: '5114', selected: false, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png' },
  ];

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-600 via-blue-400 to-red-500 min-h-screen font-sans w-full">
      {/* Dashboard Top Navigation */}
      <DashboardNav
        name={currentUser?.displayName || "Mathias"}
        role="Store Manager"
        avatar={currentUser?.photoURL}
      />

      {/* Scrollable Dashboard Area */}
      <div className="flex-1 p-2 sm:p-4 lg:p-6 overflow-y-auto w-full">
        {/* Top Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-3 sm:mb-4 lg:mb-6">
          <TopOverviewCard title="Total balance" value="$425.35" change="12.5%" type="decrease" className="bg-amber-400"/>
          <TopOverviewCard title="Customers" value="267" change="12.5%" type="decrease" />
          <TopOverviewCard title="Income" value="$450" change="25.5%" type="increase" />
          <motion.div
            className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Total balance</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-500">$425.35</p>
            <p className="text-gray-500 text-xs sm:text-sm">17 July 2025 03:35 PM</p>
          </motion.div>
        </div>

        {/* Main sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Analytics */}
          <motion.div
            className="sm:col-span-2 bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Analytics</h2>
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm font-semibold">
              <span className="text-blue-600">Customers</span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Projects</span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Income</span>
              <span className="text-gray-600 hover:text-blue-600 cursor-pointer">Monthly</span>
            </div>
            <ResponsiveContainer width="100%" height={250} minHeight={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="customers" fill="#7E3AF2" stackId="a" radius={[5, 5, 0, 0]} />
                <Bar dataKey="projects" fill="#A78BFA" stackId="a" radius={[5, 5, 0, 0]} />
                <Bar dataKey="income" fill="#6EE7B7" stackId="a" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Withdraw */}
          <motion.div
            className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md flex flex-col justify-between"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Select a card to withdraw money</h3>
            <div className="space-y-3 sm:space-y-4 mt-2 sm:mt-3">
              {withdrawalCards.map((card) => (
                <WithdrawalCardOption key={card.id} {...card} />
              ))}
              <button className="bg-blue-600 text-white px-4 sm:px-8 lg:px-20 py-2 sm:py-3 rounded-lg hover:bg-blue-700 w-full font-semibold text-sm sm:text-base">
                Confirm
              </button>
            </div>
          </motion.div>

          {/* Today */}
          <motion.div
            className="sm:col-span-2 bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Today</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {todayProjects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            <div className="flex justify-center mt-4 sm:mt-6">
              <button className="text-blue-600 font-semibold flex items-center text-sm sm:text-base">
                Show more
                <span className="ml-2 w-6 sm:w-8 h-6 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs text-gray-600">...</span>
                </span>
              </button>
            </div>
          </motion.div>

          {/* New Clients & New Projects */}
          <div className="grid gap-3 sm:gap-4">
            <motion.div
              className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <FiUsers className="text-blue-600 text-3xl sm:text-4xl mb-3 sm:mb-4" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">New Clients</h2>
                <p className="text-gray-600 text-sm sm:text-base">You have 7 clients</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg shadow-md flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <FiBriefcase className="text-blue-600 text-3xl sm:text-4xl mb-3 sm:mb-4" />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">New Project</h2>
                <p className="text-gray-600 text-sm sm:text-base">You have 23 projects</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;