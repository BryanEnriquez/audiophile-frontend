import { useState, useEffect, createContext, useContext } from 'react';
import type { Props } from '../types';

const ModalRefContext = createContext<HTMLElement | null | undefined>(
  undefined
);

export function ModalRefProvider({ children }: Props) {
  const [modalRef, setModalRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById('modalBox');
    if (el) setModalRef(el);
  }, []);

  return (
    <ModalRefContext.Provider value={modalRef}>
      {children}
    </ModalRefContext.Provider>
  );
}

export function useModalRef() {
  const context = useContext(ModalRefContext);
  if (context === undefined) {
    throw new Error('useModalRef must be used within ModalRefProvider');
  }
  return context;
}
