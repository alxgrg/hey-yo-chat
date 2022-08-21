import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../store/auth-context';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
