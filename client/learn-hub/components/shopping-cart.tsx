"use client";

import { getCart } from "@/actions/courses";
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext } from "@/app/auth-provider";

const CustomizedShoppingCart = () => {
  const { newCart, setNewCart } = useContext(AppContext);
  const [cart, setCart] = useState<{ course_id: string }[]>([]);
  useEffect(() => {
    getCart().then((res) => {
      if (res) {
        if (res.status == 200) {
          setCart(res.data.course_ids);
        }
      }
    });
  }, [newCart]);

  return (
    <Link href="/dashboard/shopping-cart">
      <div className="flex-col gap-7 ml-auto hidden lg:flex overflow-hidden items-center relative">
        <ShoppingCart />
        {cart.length > 0 && (
          <div className="absolute top-0 right-0 bg-[#04A3FD] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
            {cart.length}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CustomizedShoppingCart;
