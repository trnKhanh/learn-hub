"use client"
import { useRouter } from "next/navigation";
import { DashboardSection, DashboardSectionHeader } from "../../../_components/dashboard-section";
import { EditContextProvider } from "./edit-provider";
import { useEffect, useState } from "react";
import { getCourse } from "@/actions/courses";
import { List } from "lucide-react";
import { Skeleton } from "@mui/material";

const CourseIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
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
    <EditContextProvider params={params}>
      <DashboardSection>
        <DashboardSectionHeader icon={List}>
          {course ? (
            <span className="font-bold text-slate-400 mt-20 text-3xl">
              {course.name}
            </span>
          ) : (
            <Skeleton className="w-[200px] h-6" />
          )}
        </DashboardSectionHeader>
        {children}
      </DashboardSection>
    </EditContextProvider>
  );
};

export default CourseIdLayout;
