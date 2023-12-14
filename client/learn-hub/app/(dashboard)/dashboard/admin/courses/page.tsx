"use client";

import { deleteCourse, getAllCourses } from "@/actions/courses";
import { AdminItem } from "../_components/admin-item";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseInfoTable } from "./_components/course-info-table";
import { InfoButton } from "../_components/info-button";
import { FinancialAidLink } from "./_components/financial-aid-link";
export default function Courses() {
  const [courses, setCourses] = useState<Course[]>();
  const [isDeleting, setIsDeleting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllCourses().then((data) => {
      if (data) {
        if (!data.courses) {
          router.push("/dashboard");
        }
        setCourses((state) => data.courses);
        setIsLoading(false);
      }
    });
  }, [isDeleting]);

  if (isLoading)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Loading...</p>
      </div>
    );

  if (courses && !courses.length)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no courses</p>
      </div>
    );

  return (
    <div className="flex flex-col space-x-6">
      <p className="text-2xl pl-6 pt-6 font-bold">Courses</p>
      <div className="p-6 flex flex-col w-full space-y-6">
        {courses &&
          courses.map((course) => (
            <>
              {isDeleting === course.id ? (
                <div className="p-2 allign-center w-full text-slate-300">
                  Deleting...
                </div>
              ) : (
                <div key={course.id}>
                  <AdminItem
                    picture={course.profile_picture}
                    label={course.name}
                    onDelete={async () => {
                      setIsDeleting(course.id);
                      await deleteCourse(course.id);
                      setIsDeleting("");
                    }}
                    buttons={
                      <div className="flex space-x-2">
                        <FinancialAidLink course_id={course.id} />
                        <InfoButton
                          label="Course"
                          infoTable={<CourseInfoTable course={course} />}
                        />
                      </div>
                    }
                  />
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
