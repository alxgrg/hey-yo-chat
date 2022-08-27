import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }: { children: ReactNode }) => {
  return ReactDOM.createPortal(
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 min-h-screen'>
      <div className='flex flex-col bg-gray-700 border border-gray-600 px-10 py-8 rounded-md text-center text-white'>
        {children}
      </div>
    </div>,
    document.getElementById('modals') as HTMLElement
  );
};

export default Modal;
