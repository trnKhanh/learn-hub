"use client";

import {
  BarChart,
  CalendarCheck,
  Layout,
  List,
  Heart,
  FolderOpenDot,
  ShoppingCart,
  UserRoundCog,
  BookUser,
  User,
  UserCog,
  Shield,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { useEffect, useState } from "react";

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
    href: "/favorites",
  },
  {
    icon: ShoppingCart,
    label: "Cart",
    href: "/shopping-carts",
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
  },
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
];

const adminRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/dashboard/admin/courses",
  },
  {
    icon: BookUser,
    label: "Tutors",
    href: "/dashboard/admin/tutors",
  },
  {
    icon: User,
    label: "Students",
    href: "/dashboard/admin/students",
  },
  {
    icon: UserCog,
    label: "Supporters",
    href: "/dashboard/admin/supporters",
  },
  {
    icon: Shield,
    label: "Admins",
    href: "/dashboard/admin/admins",
  },
];

export const SidebarRoutes = () => {
  const [routes, setRoutes] = useState(guestRoutes);
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = localStorage.getItem("is_admin");
    if (isAdmin) {
      setRoutes(adminRoutes);
      return;
    }
    const isTeacher = pathname?.includes("/teacher");
    if (isTeacher) {
      setRoutes(teacherRoutes);
      return;
    }
  }, []);

  console.log(routes);
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
  );
};
