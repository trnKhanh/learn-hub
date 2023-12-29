"use client";

import { LearnProvider } from "./learn-provider";

const LearnCourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string };
}) => {
    
    return (
        <LearnProvider params={params}>
            {children}
        </LearnProvider>
    )
}

export default LearnCourseLayout