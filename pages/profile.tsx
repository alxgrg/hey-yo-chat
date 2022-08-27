import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '../store/auth-context';

import Button from '../components/ui/button';
import UserProfile from '../components/profile/user-profile';

import type { NextPage } from 'next';

const Pofile: NextPage = () => {
  const router = useRouter();

  const { isLoading, currentUser, signout } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push('/');
    }
  }, [router, currentUser, isLoading]);

  if (isLoading || !currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <UserProfile />
    </div>
  );
};

export default Pofile;
