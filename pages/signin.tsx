import type { NextPage } from 'next';
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthContext from '../store/auth-context';

import SigninForm from '../components/auth/signin-form';

const Signin: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

  const router = useRouter();

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignin = async (email: string, password: string) => {
    try {
      const user = await authCtx.signin(email, password);
      console.log(user);
      setEmail('');
      setPassword('');
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center text-white h-[calc(100vh-60px)] gap-5'>
      <h1 className='text-3xl text-pink-400'>Signin</h1>
      <SigninForm
        onSignin={handleSignin}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        emailValue={email}
        passwordValue={password}
      />
      <p>
        Or{' '}
        <Link href='/signup'>
          <a className='text-pink-400'>create an account</a>
        </Link>{' '}
        to get started
      </p>
    </div>
  );
};

export default Signin;
