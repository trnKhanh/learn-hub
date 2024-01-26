"use client";

import React, { useContext } from "react";
import { CourseContext } from "../../../course-provider";
import { CourseNavbar } from "../../_component/course-navbar";
import { CourseSidebar } from "../../_component/course-sidebar";
import { LearnLessonContext } from "../../learn-lesson-provider";

const LearnLessonLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
    const { lessons, progress } = useContext(LearnLessonContext);
    const { course } = useContext(CourseContext);

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavbar
                    course={course}
                    lessons={lessons}
                    progressCount={progress}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSidebar
                    course={course}
                    lessons={lessons}
                    progressCount={progress}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}

export default LearnLessonLayout;
