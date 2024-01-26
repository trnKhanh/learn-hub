"use client";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

import { useEffect, useState } from "react";
import { getCoursesOfTutor } from "@/actions/tutors";
import { Skeleton } from "@mui/material";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    getCoursesOfTutor().then((res) => {
      console.log(res);
      if (res && res.status == 200) {
        setCourses(res.data.courses);
      }
    });
  }, []);

  if (!courses) {
    return (
      <>
        <div className="flex flex-col items-center py-10 justify-center space-y-6">
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
          <Skeleton className="w-1/2 h-6" />
        </div>
      </>
    );
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
