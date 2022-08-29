import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '../store/auth-context';

import Button from '../components/ui/button';
import LoadingSpinner from '../components/ui/loading-spinner';
import Link from 'next/link';
import Image from 'next/image';

const Home: NextPage = () => {
  const { isLoading, currentUser, signout } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (currentUser && !isLoading) {
      router.push('/dashboard');
    }
  }, [currentUser, isLoading, router]);

  return (
    <div className='bg-gray-800 h-[calc(100vh-63px)] flex flex-col items-center justify-center'>
      {isLoading || currentUser ? (
        <LoadingSpinner />
      ) : (
        <div className='text-white text-center flex flex-col gap-5 py-8 px-5 mb-8'>
          <Image alt='logo' src='/logo.svg' width={200} height={100} />
          {/* <h1 className='text-3xl text-pink-400'>Hey, Yo!</h1> */}
          <p className='text-xl'>Create room. Share room. Chat room. </p>

          <div className='flex items-center mt-3'>
            <div className=''>
              <Button href='/signin'>Sign in</Button>
            </div>
            <div className='p-1' />
            <p>
              Or{' '}
              <Link href='/signup'>
                <a className='text-pink-400'>create an account</a>
              </Link>{' '}
              to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
