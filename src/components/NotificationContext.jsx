import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [hasNewReminders, setHasNewReminders] = useState(false);

  return (
    <NotificationContext.Provider value={{ hasNewReminders, setHasNewReminders }}>
      {children}
    </NotificationContext.Provider>
  );
};

// ✅ Custom Hook to use Notification Context
export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
