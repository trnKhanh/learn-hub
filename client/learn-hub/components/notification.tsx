"use client";

import { Bell } from 'lucide-react'
import { useState } from 'react';

const CustomizedNotification = () => {
    const [notificationCount, setNotificationCount] = useState(2);

    const addToNotification = () => {
        setNotificationCount(notificationCount + 1);
    };

    return (
        <div className="flex-col gap-7 ml-auto hidden lg:flex overflow-hidden items-center relative">
            <Bell />
            {notificationCount > 0 && (
                <div className="absolute top-0 right-0 bg-[#04A3FD] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {notificationCount}
                </div>
            )}
        </div>
    )
}

export default CustomizedNotification;