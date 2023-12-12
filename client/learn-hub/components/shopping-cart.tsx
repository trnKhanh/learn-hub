"use client";

import {ShoppingCart} from "lucide-react";
import { useState } from "react";

const CustomizedShoppingCart = () => {
    const [cartCount, setCartCount] = useState(2);

    const addToCart = () => {
        setCartCount(cartCount + 1);
    };

    return (
        <div className="flex-col gap-7 ml-auto hidden lg:flex overflow-hidden items-center relative">
            <ShoppingCart />
            {cartCount > 0 && (
                <div className="absolute top-0 right-0 bg-[#04A3FD] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCount}
                </div>
            )}
        </div>
    );
}

export default CustomizedShoppingCart;