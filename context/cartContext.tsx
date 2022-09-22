import React, { createContext, useReducer, Dispatch } from 'react';
import contextHookGenerator from '../utils/contextHookGenerator';
import type { Props } from '../types';

export type CartItem = {
  id: number;
  abbrev: string;
  price: number;
  quantity: number;
  cartImg: string;
  slug: string;
};

export type CartState = {
  [id: string]: CartItem;
};

const initialState: CartState = {};

type Id = number;

type AddItem = { type: 'ADD_ITEM'; payload: CartItem };
type RemoveItem = { type: 'REMOVE_ITEM'; payload: Id };
type RemoveAll = { type: 'REMOVE_ALL' };
type IncrementItem = { type: 'INCREMENT'; payload: Id };
type DecrementItem = { type: 'DECREMENT'; payload: Id };
type RestoreCart = { type: 'RESTORE'; payload: CartState };
type CartAction =
  | AddItem
  | RemoveItem
  | RemoveAll
  | IncrementItem
  | DecrementItem
  | RestoreCart;

type Operation = 'ADD' | 'SUBTRACT';

const updateCartItemQuantity = (
  state: CartState,
  id: number,
  op: Operation = 'ADD',
  amount: number = 1
): CartState => {
  const currentQuantity = state[id].quantity;

  const newQuantity =
    op === 'ADD' ? currentQuantity + amount : currentQuantity - amount;

  return {
    ...state,
    [id]: { ...state[id], quantity: newQuantity },
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, quantity } = action.payload;

      if (state[id]) {
        return updateCartItemQuantity(state, id, 'ADD', quantity);
      }

      return { ...state, [id]: action.payload };
    }
    case 'REMOVE_ITEM': {
      const nextState = { ...state };

      delete nextState[action.payload];
      return nextState;
    }
    case 'REMOVE_ALL': {
      return {};
    }
    case 'INCREMENT': {
      return updateCartItemQuantity(state, action.payload, 'ADD');
    }
    case 'DECREMENT': {
      const id = action.payload;

      if (state[id].quantity === 1) {
        const nextState = { ...state };

        delete nextState[id];
        return nextState;
      }

      return updateCartItemQuantity(state, id, 'SUBTRACT');
    }
    case 'RESTORE': {
      return { ...action.payload };
    }
    default:
      return state;
  }
};

const CartStateCtx = createContext<CartState | undefined>(undefined);
const CartDispatchCtx = createContext<Dispatch<CartAction> | undefined>(
  undefined
);

export function CartProvider({ children }: Props) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartStateCtx.Provider value={state}>
      <CartDispatchCtx.Provider value={dispatch}>
        {children}
      </CartDispatchCtx.Provider>
    </CartStateCtx.Provider>
  );
}

export const useCartState = contextHookGenerator(
  CartStateCtx,
  'useCartState must be used within CartProvider'
);

export const useCartDispatch = contextHookGenerator(
  CartDispatchCtx,
  'useCartDispatch must be used within CartProvider'
);
