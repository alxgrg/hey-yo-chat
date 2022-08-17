import type { NextPage } from 'next';
import { useState } from 'react';

import Button from '../ui/button';
import Input from '../ui/input';

type Props = {
  onSignin: (email: string, password: string) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailValue: string;
  passwordValue: string;
};

const SigninForm: NextPage<Props> = (props) => {
  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = props.emailValue;
    const password = props.passwordValue;
    if (
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      return;
    }

    props.onSignin(email, password);
  };

  return (
    <form className='flex flex-col' onSubmit={handleSignin}>
      <div>
        <div>
          <label htmlFor='email'>Email</label>
          <Input
            type='text'
            name='email'
            required
            value={props.emailValue}
            onChange={props.onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Input
            type='password'
            name='password'
            value={props.passwordValue}
            onChange={props.onChangePassword}
            required
          />
        </div>
      </div>

      <div>
        <Button>Submit</Button>
      </div>
    </form>
  );
};

export default SigninForm;
