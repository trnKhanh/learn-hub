"use client";
import { profile } from "console";
import { CourseOverviewCard } from "./_components/overview-card";
import { CourseSection } from "./_components/overview-section";
import { useEffect, useState } from "react";
import { getCourse, getTutorList } from "@/actions/courses";

const profile_picture =
  "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg";

const Overview = ({ params }: { params: { courseId: string } }) => {
  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    getCourse(params.courseId).then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourse(res.data.course);
        }
      }
    });
  }, []);

  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-start justify-between gap-5 mt-20 ml-20 mr-20 mb-20">
      <div className="flex flex-col w-full">
        <h2 className="text-4xl text-primary font-bold">{course.name}</h2>
        <div className="relative w-full h-96 mt-10">
          <img
            src={course.profile_picture}
            className="w-full h-full object-cover rounded-2xl"
            alt="Course Cover"
          />
        </div>
        <div className="mt-10 w-full">
          <CourseSection course={course} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <CourseOverviewCard course={course} />
      </div>
    </div>
  );
};

export default Overview;
