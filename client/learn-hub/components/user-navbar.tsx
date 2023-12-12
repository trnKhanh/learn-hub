"use client";

import CustomizedShoppingCart from "./shopping-cart";
import CustomizedNotification from "./notification";
import CustomizedAvatar from "./avatar";
import { usePathname } from "next/navigation";

const UserNavbar = () => {
    const pathName = usePathname();
    const isDashboard = pathName?.includes("/dashboard");

    return (
        <div className="flex-row gap-7 ml-auto hidden lg:flex overflow-hidden items-center right-0">
            {!isDashboard && <CustomizedNotification />}
            {!isDashboard && <CustomizedShoppingCart />}
            <CustomizedAvatar />
        </div>
    );
}

export default UserNavbar;