"use client";

import Link from "next/link";
import { MenuNavbar } from "./menu-navbar";
import NavbarItem from "./navbar-item";
import SearchInput from "./search-input";
import { Button } from "./ui/button";
import UserNavbar from "./user-navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/auth-provider";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


const Navbar = () => {
    const [isAuth, setAuth] = useState(false);
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
        <nav className="w-full fixed z-40 bg-white">
            <div className={`px-4 md:px-20 py-2 flex flex-row items-center justify-between transition duration-500 `}>
                <img src="/images/learn-hub.svg" className="h-6 lg:h-10" alt="Logo" />
                <div className="px-6 py-2 md:w-auto lg:flex">
                    <SearchInput />
                </div>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Program" />
                    <NavbarItem label="Instructor" />
                    <NavbarItem label="Universities" />
                </div>
                {isAuth ? (
                    <>
                        <UserNavbar/>
                        <div className=" lg:hidden">
                            <MenuNavbar />
                        </div>
                    </>
                ) : (
                    <div className="flex-row gap-7 ml-auto hidden lg:flex overflow-hidden items-center right-0">
                        <Link href="/sign-in">
                            <NavbarItem label="Login" />
                        </Link>
                        <Link href="/sign-up">
                            <Button>Create Free Account</Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;