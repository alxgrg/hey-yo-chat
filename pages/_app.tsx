import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../store/auth-context';
import Layout from '../components/layout/layout';
import { NotificationContextProvider } from '../store/notification-context';
import { ModalContextProvider } from '../store/modal-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <NotificationContextProvider>
        <ModalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalContextProvider>
      </NotificationContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
