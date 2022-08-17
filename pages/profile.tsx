import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AuthContext from '../store/auth-context';

import Button from '../components/ui/button';

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
    <div>
      <h1>Profile</h1>
      <p>{currentUser?.email}</p>
      <Button onClick={signout}>signout</Button>
    </div>
  );
};

export default Pofile;
