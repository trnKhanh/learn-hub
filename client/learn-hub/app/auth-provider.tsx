"use client";

import { MenuNavbar } from '@/components/menu-navbar';
import NavbarItem from '@/components/navbar-item';
import { Button } from '@/components/ui/button';
import UserNavbar from '@/components/user-navbar';
import Link from 'next/link';
import { createContext, useEffect, useState } from 'react';

interface AuthContextProps {
    isAuth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuth: false,
    setAuth: () => {},
});

export const AuthProvider = ({ children } : {
    children: React.ReactNode
}) => {
    const [isAuth, setAuth] = useState(false);

    /*useEffect(() => {
        setInterval(() => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                setAuth(true);
            } else setAuth(false);
        }, 5000)
    }, [isAuth])*/
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        setAuth(!!accessToken); // Update authentication state based on the existence of accessToken

        // Optionally, if you want to update auth status whenever localStorage changes, add the following event listener:
        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem('accessToken');
            setAuth(!!updatedToken);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <AuthContext.Provider value={{ isAuth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
