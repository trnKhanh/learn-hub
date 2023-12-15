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
  FolderPlus,
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
  console.log('123')

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
