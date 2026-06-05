import React, { createContext, useContext, useReducer, useEffect } from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; variant?: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; variant?: string; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateTotals = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId && item.variant === action.payload.variant
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        newItems = [...state.items, action.payload];
      }
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => !(item.productId === action.payload.productId && item.variant === action.payload.variant)
      );
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) => {
        if (item.productId === action.payload.productId && item.variant === action.payload.variant) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return { ...state, items: newItems, ...calculateTotals(newItems) };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};

type CartContextType = CartState & {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem("craftly-cart");
      if (localData) {
        try {
          return JSON.parse(localData);
        } catch {
          return initial;
        }
      }
    }
    return initial;
  });

  useEffect(() => {
    localStorage.setItem("craftly-cart", JSON.stringify(state));
  }, [state]);

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItem = (productId: string, variant?: string) => dispatch({ type: "REMOVE_ITEM", payload: { productId, variant } });
  const updateQuantity = (productId: string, quantity: number, variant?: string) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity, variant } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
