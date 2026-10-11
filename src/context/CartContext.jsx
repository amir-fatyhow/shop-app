import { createContext, useContext, useEffect, useReducer } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'shop-app-cart';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.productId === action.product.id);
      if (existing) {
        return state.map((i) =>
          i.productId === action.product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [
        ...state,
        {
          productId: action.product.id,
          name: action.product.name,
          price: action.product.price,
          image: action.product.image,
          quantity: 1,
        },
      ];
    }
    case 'REMOVE':
      return state.filter((i) => i.productId !== action.productId);
    case 'SET_QUANTITY': {
      if (action.quantity <= 0) {
        return state.filter((i) => i.productId !== action.productId);
      }
      return state.map((i) =>
        i.productId === action.productId
          ? { ...i, quantity: action.quantity }
          : i
      );
    }
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => dispatch({ type: 'ADD', product });
  const removeFromCart = (productId) => dispatch({ type: 'REMOVE', productId });
  const setQuantity = (productId, quantity) =>
    dispatch({ type: 'SET_QUANTITY', productId, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    totalCount,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}