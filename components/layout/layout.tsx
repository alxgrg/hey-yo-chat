import React, { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
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
      <Head>
        <title>Hey Yo! - A simple chatroom app</title>
        <meta name='description' content='A simple chatroom app' />
        <link rel='icon' href='/favicon-large.png' />
      </Head>
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
