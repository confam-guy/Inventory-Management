import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { NotificationProvider } from "./components/NotificationContext";
import { AuthProvider, useAuth } from "./Components/AuthContext";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Features from "./Pages/Features";
import Contact from "./Pages/Contact";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

// Components
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import SidebarLayout from "./components/SidebarLayout"; // ✅ Import SidebarLayout
import Clients from "./Components/Clients";
import Projects from "./components/Projects";
import Transactions from "./components/Transactions";
import Account from "./Components/Account";
import WithdrawMoney from "./components/WithdrawMoney";
import Reminder from "./components/Reminder";
import PrivacySettings from "./components/PrivacySettings";

// Public layout with Navbar
const PublicLayout = () => (
  <>
    <Navbar />
    <div className="pt-20" id="home">
      <Outlet />
    </div>
  </>
);

// Dashboard layout using SidebarLayout ✅
const DashboardLayout = () => {
  return (
    <SidebarLayout>
      <Outlet /> {/* ✅ Nested dashboard routes render here */}
    </SidebarLayout>
  );
};

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/account" element={<Account />} />
                <Route path="/withdraw" element={<WithdrawMoney />} />
                <Route path="/reminders" element={<Reminder />} />
                <Route path="/settings" element={<PrivacySettings />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
};

export default App;
