import { useState, createContext, Dispatch, SetStateAction } from 'react';
import contextHookGenerator from '../utils/contextHookGenerator';
import type { Props } from '../types';

const CartHasLoadedCtx = createContext<boolean | undefined>(undefined);
const CartHasLoadedDispatchCtx = createContext<
  Dispatch<SetStateAction<boolean>> | undefined
>(undefined);

export function CartHasLoadedProvider({ children }: Props) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <CartHasLoadedCtx.Provider value={hasLoaded}>
      <CartHasLoadedDispatchCtx.Provider value={setHasLoaded}>
        {children}
      </CartHasLoadedDispatchCtx.Provider>
    </CartHasLoadedCtx.Provider>
  );
}

export const useCartLoadState = contextHookGenerator(
  CartHasLoadedCtx,
  'useCartLoadState must be used within CartHasLoadedProvider'
);
export const useCartLoadDispatch = contextHookGenerator(
  CartHasLoadedDispatchCtx,
  'useCartLoadDispatch must be used within CartHasLoadedProvider'
);
