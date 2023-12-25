"use client";

import { getCourse } from "@/actions/courses";
import { getTutor } from "@/actions/tutors";
import { useEffect, useState } from "react";

export const CourseThumbnail = ({ course_id }: { course_id: string }) => {
  const [course, setCourse] = useState<Course>();
  const [owner, setOwner] = useState<Tutor>();
  useEffect(() => {
    getCourse(course_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourse(res.data.course);
          getTutor(res.data.course.owner_id).then((res) => {
            if (res) {
              if (res.status == 200) {
                setOwner(res.data.tutor);
              }
            }
          });
        }
      }
    });
  }, []);
  if (!course || !owner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-4 space-y-2">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-md">
        <img src={course.profile_picture} className="w-16 h-16 rounded-md" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          Course by: {owner.full_name}
        </p>
        <p className="text-xl font-medium leading-none">{course.name}</p>
        {course.discount > 0 ? (
          <div>
            <span className="text-xl text-[#04A3FD]">
              {course.price - course.price * course.discount}$
            </span>
            <span className="ml-3 line-through text-sm text-slate-400">
              {course.price}$
            </span>
          </div>
        ) : (
          <p className="text-xl text-[#04A3FD]">{course.price}$</p>
        )}
      </div>
    </div>
  );
};
