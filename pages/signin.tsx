import type { NextPage } from 'next';
import React, { useState, useContext } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthContext from '../store/auth-context';

import SigninForm from '../components/auth/signin-form';

const Signin: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authCtx = useContext(AuthContext);

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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-xl'>Signin</h1>
      <SigninForm
        onSignin={handleSignin}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        emailValue={email}
        passwordValue={password}
      />
    </div>
  );
};

export default Signin;
