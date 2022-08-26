import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children }: { children: ReactNode }) => {
  return ReactDOM.createPortal(
    <div className='bg-slate-800 bg-opacity-50 flex justify-center items-center fixed top-0 right-0 bottom-0 left-0 min-h-screen'>
      <div className='bg-white px-16 py-14 rounded-md text-center'>
        {children}
      </div>
    </div>,
    document.getElementById('modals') as HTMLElement
  );
};

export default Modal;
