import { createContext, useContext, useReducer, Dispatch } from 'react';
import type { Props } from '../types';

// TODO update placeholders
interface Product {
  id: number;
  name: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartItems {
  [id: string]: CartItem;
}

// TODO
interface CartState {
  items: CartItems;
}

const initialState: CartState = {
  items: {},
};

type Id = number;
type CartItemWithQuantity = { item: CartItem; count: number };

type AddItem = { type: 'ADD_ITEM'; payload: CartItemWithQuantity };
type RemoveItem = { type: 'REMOVE_ITEM'; payload: Id };
type IncrementItem = { type: 'INCREMENT'; payload: Id };
type DecrementItem = { type: 'DECREMENT'; payload: Id };
type CartAction = AddItem | RemoveItem | IncrementItem | DecrementItem;

type Operation = 'ADD' | 'SUBTRACT';

const updateCartItemQuantity = (
  state: CartState,
  id: number,
  op: Operation = 'ADD',
  amount: number = 1
): CartState => {
  const currentQuantity = state.items[id].quantity;
  const newQuantity =
    op === 'ADD' ? currentQuantity + amount : currentQuantity - amount;

  return {
    items: {
      ...state.items,
      [id]: {
        ...state.items[id],
        quantity: newQuantity,
      },
    },
  };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const {
        item: { id },
        count,
      } = action.payload;

      if (state.items[id]) {
        return updateCartItemQuantity(state, id, 'ADD', count);
      }

      return {
        items: { ...state.items, [id]: action.payload },
      };
    }
    case 'REMOVE_ITEM': {
      const nextState = {
        items: {
          ...state.items,
        },
      };

      delete nextState.items[action.payload];
      return nextState;
    }
    case 'INCREMENT': {
      return updateCartItemQuantity(state, action.payload, 'ADD');
    }
    case 'DECREMENT': {
      const id = action.payload;

      if (state.items[id].quantity === 1) {
        const nextState = {
          items: {
            ...state.items,
          },
        };

        delete nextState.items[action.payload];
        return nextState;
      }

      return updateCartItemQuantity(state, id, 'SUBTRACT');
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
