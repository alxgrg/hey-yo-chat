// import { NextPage } from 'next';
// import React from 'react';

// type Props = {
//   type: string;
//   name: string;
//   required?: boolean;
// };

// const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
//   return (
//     <input
//       type={props.type}
//       name={props.name}
//       required={props.required}
//       ref={ref}
//       className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
//     />
//   );
// });

// Input.displayName = 'Input';

// export default Input;

import type { NextPage } from 'next';
import React from 'react';

type Props = {
  type: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
  autocomplete?: string;
};

const Input: NextPage<Props> = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      required={props.required}
      autoComplete={props.autocomplete}
      className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
    />
  );
};

export default Input;
