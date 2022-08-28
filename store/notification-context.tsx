import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Notification {
  title: string;
  message: string;
  status: string;
}

interface NotificationContextInterface {
  notification: Notification | null;
  showNotification: (notificationData: Notification) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext({} as NotificationContextInterface);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    if (
      (activeNotification && activeNotification.status === 'success') ||
      activeNotification?.status === 'error'
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: Notification) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
