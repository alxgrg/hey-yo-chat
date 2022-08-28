import { useContext } from 'react';

import NotificationContext from '../../store/notification-context';

type Props = {
  title: string;
  message: string;
  status: string;
};

function Notification(props: Props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = 'bg-green-600';
  }

  if (status === 'error') {
    statusClasses = 'bg-red-600';
  }

  if (status === 'pending') {
    statusClasses = 'bg-blue-400';
  }

  const notificationClasses =
    'flex flex-col justify-between items-center fixed right-0 bottom-0 h-20 sm:max-w-lg w-full rounded-lg text-white p-5';

  const activeClasses = notificationClasses + ' ' + statusClasses;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
