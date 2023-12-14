"course client";

import { getCourse } from "@/actions/courses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export const CourseThumbnail = ({ course_id }: { course_id: string }) => {
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    getCourse(course_id).then((res) => {
      console.log(res);
      if (res && res.status == 200) setCourse(res.data.course);
    });
  }, []);

  return (
    <div className="flex space-x-6 items-center">
      <Avatar>
        <AvatarImage src={course?.profile_picture} />
        <AvatarFallback className="bg-slate-500 uppercase text-white">
          {course?.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="">{course?.name}</div>
    </div>
  );
};
