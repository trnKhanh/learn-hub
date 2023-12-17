import { getCourse } from "@/actions/courses";
import { getStudent } from "@/actions/students";
import {
  InfoTable,
  InfoTableKey,
  InfoTableRow,
  InfoTableValue,
} from "@/app/(dashboard)/dashboard/_components/info-table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const FinancialAidInfoTable = ({
  financialAid,
}: {
  financialAid: FinancialAid;
}) => {
  const [student, setStudent] = useState<Student>();
  const [course, setCourse] = useState<Course>();
  useEffect(() => {
    getStudent(financialAid.student_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setStudent(res.data.student);
        } else {
          toast.error(res.data.message);
        }
      }
    });
    getCourse(financialAid.course_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setCourse(res.data.course);
        } else {
          toast.error(res.data.message);
        }
      }
    });
  }, []);

  return (
    <InfoTable label="Financial Aid">
      <InfoTableRow>
        <InfoTableKey>Student</InfoTableKey>
        {student && (
          <InfoTableValue> {student.username || "None"}</InfoTableValue>
        )}
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Course</InfoTableKey>
        {course && <InfoTableValue> {course.name || "None"}</InfoTableValue>}
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Essay</InfoTableKey>
        <InfoTableValue> {financialAid.essay || "None"}</InfoTableValue>
      </InfoTableRow>
      <InfoTableRow>
        <InfoTableKey>Amount of money</InfoTableKey>
        <InfoTableValue> {financialAid.amount || "0"}</InfoTableValue>
      </InfoTableRow>
    </InfoTable>
  );
};
