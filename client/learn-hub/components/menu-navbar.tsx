import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";

import SidebarNavbar from "./sidebar-navbar";
import NavbarItem from "./navbar-item";

export const MenuNavbar = () => {
    return (
        <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu />
        </SheetTrigger>
        <SheetContent side="right" className="p-0 bg-white">
            <div className="py-10 h-full border-r flex flex-col shadow-sm">
                <div className="flex flex-col cursor-pointer items-start">
                    <div className="ml-5 mb-5">
                        <NavbarItem label="Program" />
                    </div>
                    <div className="ml-5 mb-5">
                        <NavbarItem label="Instructor" />
                    </div>
                    <div className="ml-5 mb-5">
                        <NavbarItem label="Universities" />
                    </div>
                    <div className="ml-5 mb-5">
                        <NavbarItem label="Login" />
                    </div>
                    <div className="ml-5 mb-5">
                        <NavbarItem label="Register" />
                    </div>
                </div>
            </div>
        </SheetContent>
        </Sheet>
    )
}