// import type { NextPage } from 'next';
// import React from 'react';

// type Props = {
//   type: string;
//   name: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   value: string;
//   required?: boolean;
//   autocomplete?: string;
// };

// const Input: NextPage<Props> = (props) => {
//   return (
//     <input
//       type={props.type}
//       name={props.name}
//       value={props.value}
//       onChange={props.onChange}
//       required={props.required}
//       autoComplete={props.autocomplete}
//       className='appearance-none rounded-2xl relative block w-full px-3 py-2 border border-slate-500 placeholder-gray-500 text-white focus:outline-none focus:ring-pink-400 focus:border-pink-400 bg-slate-800 focus:z-10'
//     />
//   );
// };

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
  buttonContent?: string;
  placeholder: string;
};

const Input: NextPage<Props> = (props) => {
  return (
    <div className='relative w-full'>
      {/* <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
        <svg
          aria-hidden='true'
          className='w-5 h-5 text-gray-500 dark:text-gray-400'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          ></path>
        </svg>
      </div> */}
      <input
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        autoComplete={props.autocomplete}
        placeholder={props.placeholder}
        className='block p-4 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
      />
      {props.buttonContent && (
        <button
          type='submit'
          className='text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800'
        >
          {props.buttonContent}
        </button>
      )}
    </div>
  );
};

export default Input;
