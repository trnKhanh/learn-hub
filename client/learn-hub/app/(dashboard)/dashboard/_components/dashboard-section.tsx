"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

export const DashboardSection = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-col space-y-2">{children}</div>;
};

export const DashboardSectionHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-2xl font-bold px-5">{children}</p>;
};
export const DashboardSectionSubHeader = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-xl font-bold px-5">{children}</p>;
};

export const DashboardSectionContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="p-6 flex flex-col space-y-6">{children}</div>;
};

export const DashboardSectionItem = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center text-slate-500 font-[500] bg-slate-100 hover:bg-slate-200 hover:text-slate-600 rounded-2xl p-2">
      {children}
    </div>
  );
};

export const DashboardSectionItemRight = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="ml-auto flex space-x-2">{children}</div>;
};

export const DashboardSectionItemLeft = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="mr-auto flex space-x-2">{children}</div>;
};

interface DashboardSectionButtonProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  hover?: boolean | false;
  href?: string;
}
export const DashboardSectionButton = ({
  icon: Icon,
  label,
  className,
  hover,
  href,
}: DashboardSectionButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          cn(
            "flex items-center bg-slate-300 text-slate-500 p-2 rounded-xl cursor-default",
            hover && "group hover:bg-slate-500 hover:text-white cursor-pointer",
          ),
          className,
        )}
      >
        <Icon />
        <span
          className={cn(
            "border-l-2 border-slate-500 pl-2 ml-2",
            hover && "group-hover:border-white",
          )}
        >
          {label}
        </span>
      </Link>
    );
  }
  return (
    <button
      className={cn(
        cn(
          "flex items-center bg-slate-300 text-slate-500 p-2 rounded-xl cursor-default",
          hover && "group hover:bg-slate-500 hover:text-white cursor-pointer",
        ),
        className,
      )}
    >
      <Icon />
      <span
        className={cn(
          "border-l-2 border-slate-500 pl-2 ml-2",
          hover && "group-hover:border-white",
        )}
      >
        {label}
      </span>
    </button>
  );
};
