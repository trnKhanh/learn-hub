"use client";

import { getCourse } from "@/actions/courses";
import { useEffect, useState } from "react";
import {
  DashboardSection,
  DashboardSectionHeader,
} from "../../../_components/dashboard-section";
import { useRouter } from "next/navigation";

export default function Layout({
  params,
  children,
}: {
  params: {
    course_id: string;
  };
  children: React.ReactNode;
}) {
  const [course, setCourse] = useState<Course>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getCourse(params.course_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourse(res.data.course);
        } else {
          router.push("/dashboard");
        }
      }
    });
  }, []);

  return (
    <DashboardSection>
      <DashboardSectionHeader>
        <span className="font-bold text-slate-400">Course:</span>{" "}
        {course ? course.name : "Loading..."}
      </DashboardSectionHeader>
      {children}
    </DashboardSection>
  );
}
