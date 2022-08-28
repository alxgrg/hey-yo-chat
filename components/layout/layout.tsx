import React, { useContext } from 'react';
import type { NextPage } from 'next';
import Navbar from './navbar';
import Notification from '../ui/notification';

import NotificationContext from '../../store/notification-context';

type Props = {
  children: React.ReactNode;
};

const Layout: NextPage<Props> = ({ children }) => {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
