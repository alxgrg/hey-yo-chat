import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../store/auth-context';
import Layout from '../components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
