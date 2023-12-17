"use client";

import { deleteCourse, getAllCourses } from "@/actions/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardSectionHeader,
  DashboardSection,
  DashboardSectionButton,
  DashboardSectionContent,
  DashboardSectionItem,
  DashboardSectionItemLeft,
  DashboardSectionItemRight,
} from "../../_components/dashboard-section";
import { UserThumbnail } from "../../_components/user-thumbnail";
import { ArrowUpRightSquare, Trash2 } from "lucide-react";
import { CourseDeleteDialog } from "./_components/course-delete-dialog";
import { notFound } from "next/navigation";
import { CourseInfoDialog } from "./_components/course-info-dialog";
import { toast } from "react-toastify";
import { CourseThumbnail } from "../../_components/course-thumbnail";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllCourses().then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourses((state) => res.data.courses);
          setIsLoading(false);
        } else {
          toast.error(res.data.message);
          router.push("/dashboard/admin");
        }
      }
    });
  }, [isDeleting]);

  if (isLoading)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Loading...</p>
      </div>
    );

  if (courses && !courses.length) notFound();

  return (
    <DashboardSection>
      <DashboardSectionHeader>Courses</DashboardSectionHeader>

      <DashboardSectionContent>
        {courses &&
          courses.map((course) => (
            <DashboardSectionItem key={course.id}>
              <DashboardSectionItemLeft>
                <CourseThumbnail course_id={course.id} />
              </DashboardSectionItemLeft>

              <DashboardSectionItemRight>
                <DashboardSectionButton
                  icon={ArrowUpRightSquare}
                  label="Financial Aids"
                  href={`/dashboard/admin/courses/${course.id}/financial-aids`}
                  hover={true}
                  />
                <CourseInfoDialog course={course} />
                <CourseDeleteDialog
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  onDelete={async () => {
                    const res = await deleteCourse(course.id);
                    if (res && res.status != 200)
                      toast.error(res.data.message)
                  }}
                />
              </DashboardSectionItemRight>
            </DashboardSectionItem>
          ))}
      </DashboardSectionContent>
    </DashboardSection>
  );
}

