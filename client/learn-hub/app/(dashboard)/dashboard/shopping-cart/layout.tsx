"use client";
import { CartProvider } from "./cart-provider";

const CartLayout = ({ children }: { children: React.ReactNode }) => {
  return <CartProvider>{children}</CartProvider>;
};

export default CartLayout;
