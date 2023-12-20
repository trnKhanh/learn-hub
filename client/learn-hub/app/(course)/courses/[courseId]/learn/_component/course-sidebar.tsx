"use client";

import { redirect } from "next/navigation";

import { CourseProgress } from "@/components/course-progress";

import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSidebarProps {
    course: Course & {
        lessons: (Lesson & {
            studentProgress: LearnLesson | null;
        })[]
    };
    progressCount: number;
}

export const CourseSidebar = ({
    course,
    progressCount,
}: CourseSidebarProps) => {
    const purchase = false;

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
            <h1 className="font-semibold">
            {course.name}
            </h1>
            {purchase && (
            <div className="mt-10">
                <CourseProgress
                variant="success"
                value={progressCount}
                />
            </div>
            )}
        </div>
        <div className="flex flex-col w-full">
            {course.lessons.map((lesson) => (
                <CourseSidebarItem
                    key={lesson.id}
                    id={lesson.id}
                    label={lesson.name}
                    isCompleted={!!lesson.studentProgress?.finished_at}
                    courseId={lesson.course_id}
                    isLocked={!lesson.isFree && !purchase}
                />
                ))}
        </div>
        </div>
    )
}