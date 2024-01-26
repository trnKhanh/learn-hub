"use client";

import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
  course: Course | undefined;
  lessons: LearnLesson[] | undefined;
  progressCount: number;
}

export const CourseNavbar = ({
  course,
  lessons,
  progressCount,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        lessons={lessons}
        progressCount={progressCount}
      />
    </div>
  );
};
