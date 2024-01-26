"use client";

import { redirect } from "next/navigation";

const CourseIdPage = ({
    params
}: {
    params: { courseId: string; }
}) => {
    return redirect(`/courses/${params.courseId}/learn/lessons/${1}`);
}

export default CourseIdPage;
