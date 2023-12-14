import { getCourse } from "@/actions/courses";
import { getStudent } from "@/actions/students";
import { useEffect, useState } from "react";

export const FinancialAidInfoTable = ({
  financialAid,
}: {
  financialAid: FinancialAid;
}) => {
  const [student, setStudent] = useState<Student>();
  const [course, setCourse] = useState<Course>();
  useEffect(() => {
    getStudent(financialAid.student_id).then((data) => {
      if (data && data.student) setStudent(data.student);
    });
    getCourse(financialAid.course_id).then((data) => {
      if (data && data.course) setCourse(data.course);
    });
  });

  return (
    <div className="flex flex-col">
      <table className="border border-collapse ">
        {student && (
          <tr className="hover:bg-slate-100">
            <th className="w-1/2 text-left border border-slate-700 p-1">
              Student
            </th>
            <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
              {student.username || "None"}
            </th>
          </tr>
        )}
        {course && (
          <tr className="hover:bg-slate-100">
            <th className="w-1/2 text-left border border-slate-700 p-1">
              Course
            </th>
            <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
              {course.name || "None"}
            </th>
          </tr>
        )}
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">Essay</th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {financialAid.essay || "None"}
          </th>
        </tr>
        <tr className="hover:bg-slate-100">
          <th className="w-1/2 text-left border border-slate-700 p-1">
            Amount of money
          </th>
          <th className="w-1/2 text-left border border-slate-700 p-1 font-normal">
            {financialAid.amount || "None"}
          </th>
        </tr>
      </table>
    </div>
  );
};
