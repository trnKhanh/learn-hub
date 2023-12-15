"use client";

import { BarChart, CalendarCheck, Layout, List, Heart, FolderOpenDot, ShoppingCart, UserRoundCog, FolderPlus } from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: FolderOpenDot,
    label: "My Courses",
    href: "/dashboard/my-courses",
  },
  {
    icon: Heart,
    label: "Favorites",
    href: "/dashboard/favorites",
  },
  {
    icon: ShoppingCart,
    label: "Cart",
    href: "/dashboard/shopping-cart",
  },
  {
    icon: CalendarCheck,
    label: "Schedule",
    href: "/dashboard/schedule",
  },
  {
    icon: UserRoundCog,
    label: "Profile",
    href: "/dashboard/profile",
  }
];

const teacherRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: FolderPlus,
    label: "Create new course",
    href: "/dashboard/teacher/create-course",
  },
  {
    icon: FolderOpenDot,
    label: "My Courses",
    href: "/dashboard/teacher/my-courses",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  //const isTeacherPage = pathname?.includes("/teacher");

  //const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  const routes = teacherRoutes

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}