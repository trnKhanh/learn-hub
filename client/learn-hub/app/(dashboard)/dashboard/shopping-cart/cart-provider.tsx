"use client";
import { createContext, useState } from "react";

interface CartContextProps {
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextProps>({
  isUpdating: false,
  setIsUpdating: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <CartContext.Provider value={{ isUpdating, setIsUpdating }}>
      {children}
    </CartContext.Provider>
  );
};
