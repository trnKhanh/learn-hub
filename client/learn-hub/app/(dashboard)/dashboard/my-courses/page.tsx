"use client";

import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_component/info-card";

import { getAllCourses } from "@/actions/courses";

import { CoursesList } from "@/components/courses-list";
import { useEffect, useState } from "react";
import { getRegisteredCourses } from "@/actions/students";
import { toast } from "react-toastify";

export default function MyCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    getRegisteredCourses().then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourses(res.data.courses);
        }
      }
    });
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard icon={Clock} label="In Progress" numberOfItems={10} />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={10}
          variant="success"
        />
      </div>
      <CoursesList isHorizontal={true} courses={courses} />
    </div>
  );
}
