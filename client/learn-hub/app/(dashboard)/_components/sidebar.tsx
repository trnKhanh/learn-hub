import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import Link from "next/link";
export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <Link href="/" className="p-6">
        <img src="/images/learn-hub.svg" className="h-8 lg:h-10" alt="Logo" />
      </Link>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
