"use client";

import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";
import { useContext } from "react";
import { CourseContext } from "../../course-provider";
import Link from "next/link"

interface CourseSidebarProps {
  course: Course | undefined;
  lessons: LearnLesson[] | undefined;
  progressCount: number;
}

export const CourseSidebar = ({
  course,
  lessons,
  progressCount,
}: CourseSidebarProps) => {
  const { isPurchased } = useContext(CourseContext);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <Link href="/" className="p-2">
          <img src="/images/learn-hub.svg" className="h-8 lg:h-10" alt="Logo" />
        </Link>
        <h1 className="font-semibold text-xl">{course?.name}</h1>
        {isPurchased && (
          <div className="mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {lessons?.map((lesson) => (
          <CourseSidebarItem
            key={lesson.id}
            id={lesson.id}
            label={lesson.name}
            isCompleted={!!lesson.finished_at}
            courseId={lesson.course_id}
            isLocked={!lesson.isFree && !isPurchased}
          />
        ))}
      </div>
    </div>
  );
};
