"use client";

import { getCourse } from "@/actions/courses";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    getCourse(params.course_id).then((data) => {
      if (data && data.course) {
        setCourse(data.course);
      }
    });
  });

  return (
    <div className="flex flex-col pt-6">
      <p className="text-2xl text ml-6">
        <span className="font-bold text-slate-400">Course:</span>{" "}
        {course ? course.name : "Loading..."}
      </p>
      {children}
    </div>
  );
}
