import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '../store/auth-context';

import Button from '../components/ui/button';
import UserProfile from '../components/profile/user-profile';

import type { NextPage } from 'next';
import LoadingSpinner from '../components/ui/loading-spinner';

const Pofile: NextPage = () => {
  const router = useRouter();

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/');
    }
  }, [router, currentUser, isLoading]);

  return (
    <div className='flex flex-col items-center w-full'>
      {isLoading || !currentUser ? <LoadingSpinner /> : <UserProfile />}
    </div>
  );
};

export default Pofile;
