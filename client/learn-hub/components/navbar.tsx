"use client";

import { MenuNavbar } from "./menu-navbar";
import NavbarItem from "./navbar-item";
import SearchInput from "./search-input";
import { Button } from "./ui/button";
import UserNavbar from "./user-navbar";

const Navbar = () => {
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
                {/*<div className="flex-row gap-7 ml-auto hidden lg:flex overflow-hidden items-center right-0">
                    <NavbarItem label="Login" />
                    <Button>Create Free Account</Button>
    </div>*/}
                <UserNavbar/>
                <div className=" lg:hidden">
                    <MenuNavbar />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;