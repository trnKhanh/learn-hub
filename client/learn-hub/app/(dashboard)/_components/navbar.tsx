import { MobileSidebar } from "./mobile-sidebar"
import UserNavbar from "@/components/user-navbar"

export const NavbarDashboard = () => {
    return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <MobileSidebar />
        <UserNavbar />
    </div>
    )
}