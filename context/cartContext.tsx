import { createContext, useContext, useReducer, Dispatch } from 'react';
import type { Props } from '../types';

type CartItem = {
  id: number;
  abbrev: string;
  price: number;
  quantity: number;
  cartImg: string;
};

type CartState = {
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
      return action.payload;
    }
    default:
      return state;
  }
};

const CartContext = createContext<
  { cart: CartState; dispatch: Dispatch<CartAction> } | undefined
>(undefined);

export function CartProvider({ children }: Props) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
