"use client";

import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import { CourseProgress } from "./course-progress";
import { formatPrice } from "@/lib/format";
import { useEffect, useState } from "react";
import { getCourse, getCourseProgress, getLessons } from "@/actions/courses";
import { getSubjectByCourseId, getSubjects } from "@/actions/category";
import { toast } from "react-toastify";

interface CourseCardProps {
  id: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
}

export const CourseCardHorizontal = ({ id }: { id: string }) => {
  const [course, setCourse] = useState<Course>();
  const [progress, setProgress] = useState<number>(0);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(()=>{
    getCourse(id).then(res => {
      if (res && res.status == 200) {
        setCourse(res.data.course);
      }
    })

    getCourseProgress(id).then(res => {
      if (res && res.status == 200) {
        setProgress(res.data.progress.progress);
      }
    })

    getLessons(id).then(res => {
      if (res && res.status == 200) {
        setLessons(res.data.lessons);
      }
    })
  }, [])

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 w-full">
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {course.name}
          </div>
          <p className="text-xs text-muted-foreground">{course.subjects.length && course.subjects[0]}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 1 ? "success" : "default"}
              size="sm"
              value={progress * 100}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(course.price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
