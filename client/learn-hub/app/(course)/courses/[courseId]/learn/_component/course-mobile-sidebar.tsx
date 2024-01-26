"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course | undefined;
  lessons: LearnLesson[] | undefined;
  progressCount: number;
}

export const CourseMobileSidebar = ({
  course,
  lessons,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar
          course={course}
          lessons={lessons}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  );
};
