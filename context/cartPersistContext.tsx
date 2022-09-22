import { useState, createContext } from 'react';
import contextHookGenerator from '../utils/contextHookGenerator';
import type { Props } from '../types';

const CartPersistCtx = createContext<boolean | undefined>(undefined);
const CartPersistDispatchCtx = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

export function CartPersistProvider({ children }: Props) {
  const [persist, setPersist] = useState(true);

  return (
    <CartPersistCtx.Provider value={persist}>
      <CartPersistDispatchCtx.Provider value={setPersist}>
        {children}
      </CartPersistDispatchCtx.Provider>
    </CartPersistCtx.Provider>
  );
}

export const useCartPersist = contextHookGenerator(
  CartPersistCtx,
  'useCartPersist must be used within CartPersistProvider'
);

export const useCartPersistDispatch = contextHookGenerator(
  CartPersistDispatchCtx,
  'useCartPersistDispatch must be used within CartPersistProvider'
);
