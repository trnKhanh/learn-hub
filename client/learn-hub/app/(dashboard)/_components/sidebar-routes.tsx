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
  Cog,
  Cross,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { useEffect, useState } from "react";
import { getMineAdmin } from "@/actions/admins";

const guestRoutes = [
  {
    icon: FolderOpenDot,
    label: "Registered Courses",
    href: "/dashboard/my-courses",
  },
  {
    icon: ShoppingCart,
    label: "Cart",
    href: "/dashboard/shopping-cart",
  },
  {
    icon: UserRoundCog,
    label: "Profile",
    href: "/dashboard/profile",
  },
  {
    icon: Cross,
    label: "Support",
    href: "/dashboard/support",
  },
];

const teacherRoutes = [
  {
    icon: FolderPlus,
    label: "Create new course",
    href: "/dashboard/tutor/create-course",
  },
  {
    icon: FolderOpenDot,
    label: "My Courses",
    href: "/dashboard/tutor/courses",
  },
];

export const SidebarRoutes = ({
  role,
  admin_id,
}: {
  role?: string;
  admin_id?: string;
}) => {
  const [routes, setRoutes] = useState(guestRoutes);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTutor, setIsTutor] = useState(false);

  useEffect(() => {
    console.log(role);
    if (role === undefined) {
      const isAdmin = localStorage.getItem("is_admin");
      if (isAdmin == "1") {
        setIsAdmin(true);
      }
      const isTutor = localStorage.getItem("is_tutor");
      if (isTutor == "1") {
        setIsTutor(true);
      }
    }

    if (role == "admin") {
      getMineAdmin().then((res) => {
        const adminRoutes = [];
        if (res && res.status == 200) {
          if (res.data.admin.courses_access) {
            adminRoutes.push({
              icon: List,
              label: "Courses",
              href: "/dashboard/admin/courses",
            });
          }
          if (res.data.admin.tutors_access) {
            adminRoutes.push({
              icon: BookUser,
              label: "Tutors",
              href: "/dashboard/admin/tutors",
            });
          }
          if (res.data.admin.students_access) {
            adminRoutes.push({
              icon: User,
              label: "Students",
              href: "/dashboard/admin/students",
            });
          }
          if (res.data.admin.supporters_access) {
            adminRoutes.push({
              icon: UserCog,
              label: "Supporters",
              href: "/dashboard/admin/supporters",
            });
          }
          setRoutes(adminRoutes);
        }
      });
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
      {isTutor && (
        teacherRoutes.map((route) => (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />))
      )}
      {isAdmin && (
        <SidebarItem
          key={"/dashboard/admin"}
          icon={Shield}
          label={"Admin"}
          href={"/dashboard/admin"}
        />
      )}
      {role == undefined && (
        <SidebarItem
          key={"/dashboard/tutor"}
          icon={BookUser}
          label={"Tutor Verification"}
          href={"/dashboard/tutor/verification"}
        />
      )}
    </div>
  );
};
