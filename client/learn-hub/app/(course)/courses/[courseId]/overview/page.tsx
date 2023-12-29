"use client";
import { CourseOverviewCard } from "./_components/overview-card";
import { CourseSection } from "./_components/overview-section";
import { useContext } from "react";
import { CourseContext } from "../course-provider";

const Overview = () => {
  const {course} = useContext(CourseContext);

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
