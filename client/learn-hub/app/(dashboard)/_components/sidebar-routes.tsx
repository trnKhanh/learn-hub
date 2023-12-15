"use client";

import { BarChart, CalendarCheck, Layout, List, Heart, FolderOpenDot, ShoppingCart, UserRoundCog } from "lucide-react";
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
    href: "/search",
  },
  {
    icon: ShoppingCart,
    label: "Cart",
    href: "/search",
  },
  {
    icon: CalendarCheck,
    label: "Schedule",
    href: "/search",
  },
  {
    icon: UserRoundCog,
    label: "Edit Profile",
    href: "/dashboard/edit-profile",
  }
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

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