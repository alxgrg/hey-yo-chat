// import { NextPage } from 'next';
// import { useRef, createRef } from 'react';

// import Button from '../ui/button';
// import Input from '../ui/input';

// type Props = {
//   onSignup: (email: string, password: string) => void;
// };

// const SignupForm: NextPage<Props> = (props) => {
//   const emailInputRef = useRef<HTMLInputElement>(null);
//   const passwordInputRef = useRef<HTMLInputElement>(null);

//   const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const email = emailInputRef.current?.value;
//     const password = passwordInputRef.current?.value;
//     if (
//       !email ||
//       email.trim().length === 0 ||
//       !password ||
//       password.trim().length === 0
//     ) {
//       return;
//     }

//     props.onSignup(email, password);

//   };

//   return (
//     <form className='flex flex-col' onSubmit={handleSignup}>
//       <div>
//         <div>
//           <label htmlFor='email'>Email</label>
//           <Input type='text' name='email' required ref={emailInputRef} />
//         </div>
//         <div>
//           <label htmlFor='password'>Password</label>
//           <Input
//             type='password'
//             name='password'
//             required
//             ref={passwordInputRef}
//           />
//         </div>
//       </div>

//       <div>
//         <Button>Submit</Button>
//       </div>
//     </form>
//   );
// };

// export default SignupForm;

import type { NextPage } from 'next';
import { useState } from 'react';

import Button from '../ui/button';
import Input from '../ui/input';

type Props = {
  onSignup: (email: string, password: string) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailValue: string;
  passwordValue: string;
};

const SignupForm: NextPage<Props> = (props) => {
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
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

    props.onSignup(email, password);
  };

  return (
    <form className='flex flex-col' onSubmit={handleSignup}>
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

export default SignupForm;
