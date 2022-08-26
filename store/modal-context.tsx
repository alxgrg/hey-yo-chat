import React, { createContext, useState, ReactNode } from 'react';

interface Modal {
  id: string;
}

interface ModalContextState {
  modal: Modal | null;
  showModal: (id?: string) => void;
  hideModal: () => void;
}

const ModalContext = createContext({} as ModalContextState);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<Modal | null>(null);

  function showModalHandler(id = 'default') {
    setActiveModal({ id: id });
    document.body.style.overflow = 'hidden';
  }

  function hideModalHandler() {
    setActiveModal(null);
    document.body.removeAttribute('style');
  }

  const context = {
    modal: activeModal,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
  };

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
}

export default ModalContext;
