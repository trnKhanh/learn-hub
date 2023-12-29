"use client"
import { useRouter } from "next/navigation";
import { DashboardSection, DashboardSectionHeader } from "@/app/(dashboard)/dashboard/_components/dashboard-section";
import { useEffect, useState } from "react";
import { getCourse } from "@/actions/courses";
import { List } from "lucide-react";
import { LessonEditContextProvider } from "./lesson-provider";

const LessonIdLayout = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { courseId: string, lessonId: string };
}) => {
    const [course, setCourse] = useState<Course>();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        getCourse(params.courseId).then((res) => {
        if (res) {
            if (res.status == 200) {
            setCourse(res.data.course);
            } else {
            router.push("/dashboard/admin");
            }
        }
        });
    }, []);

    return (
        <LessonEditContextProvider params={params}>
            {children}
        </LessonEditContextProvider>
    );
};

export default LessonIdLayout;